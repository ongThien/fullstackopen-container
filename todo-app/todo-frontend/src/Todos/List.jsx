import React from 'react'

import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {

  return (
    <>
      {todos.map(todo => {
        return (
          <>
            <Todo key={todo._id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} />
            <hr />
          </>
        )
      })}
    </>
  )
}

export default TodoList
