const express = require('express');
const redis = require('../redis');
const { Todo } = require('../mongo')
const router = express.Router();

const { ADDED_TODOS_KEY } = require('../util/constants');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  console.log(todos);

  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const currentCount = await redis.getAsync(ADDED_TODOS_KEY);
  const newCount = currentCount ? +currentCount + 1 : 1;
  await redis.setAsync(ADDED_TODOS_KEY, newCount);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();

  const currentCount = await redis.getAsync(ADDED_TODOS_KEY);

  if (!currentCount || +currentCount === 0) return res.sendStatus(400);

  const newCount = +currentCount - 1;
  await redis.setAsync(ADDED_TODOS_KEY, newCount);

  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  //res.sendStatus(405); // Implement this
  res.status(200).send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;
  //should have validation here
  req.todo.text = text;
  req.todo.done = done;
  await req.todo.save();
  res.status(200).send(req.todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
