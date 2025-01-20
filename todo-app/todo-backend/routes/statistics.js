const express = require('express');
const router = express.Router();

const redis = require('../redis');
const { Todo } = require('../mongo');
const { ADDED_TODOS_KEY } = require('../util/constants');

router.get('/', async (req, res) => {
  const addedTodos = await redis.getAsync(ADDED_TODOS_KEY);

  if (!addedTodos) {
    const currentTodos = await Todo.find({});
    await redis.setAsync(ADDED_TODOS_KEY, currentTodos.length)
    return res.status(200).send(JSON.stringify({ added_todos: currentTodos.length }));
  }

  res.status(200).send({ added_todos: addedTodos });
});

module.exports = router;
