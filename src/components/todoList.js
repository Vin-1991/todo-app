import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import { toggleTodo } from '../redux/actions';

const Todo = ({ todo, id, toggleTodo }) => (
    <li className={todo.completed ? 'completed' : ''} onClick={() => toggleTodo(id)}>{todo.todoName}</li>
)

function TodoList({ todos, toggleTodo }) {
    console.log(todos);
    return (
        _.keys(todos).map((id) => (
            <Todo key={id} id={id} toggleTodo={toggleTodo} todo={todos[id]} />
        ))
    )
}

export default connect(null, { toggleTodo })(TodoList);