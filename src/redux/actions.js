import { ADD_TODO_BUCKET, EDIT_TODO_BUCKET, DELETE_TODO_BUCKET } from './actionTypes'
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO } from './actionTypes'


let ToDo = 1;
let Bucket = 1;

export const addTodoBucket = (bucketName, incompeleteCount, completedCount, createdTime) => (
    {
        type: ADD_TODO_BUCKET,
        payload: {
            bucketId: Bucket++,
            bucketName,
            incompeleteCount,
            completedCount,
            createdTime
        }
    }
)

export const editTodoBucket = (id) => (
    {
        type: EDIT_TODO_BUCKET,
        payload: {
            id
        }
    }
)

export const deleteTodoBucket = (bucketId) => (
    {
        type: DELETE_TODO_BUCKET,
        payload: {
            bucketId
        }
    }
)

export const addTodo = (bucketId, todoName) => (
    {
        type: ADD_TODO,
        payload: {
            id: ToDo++,
            bucketId,
            todoName
        }
    }
)

export const toggleTodo = (id) => (
    {
        type: TOGGLE_TODO,
        payload: {
            id
        }
    }
)

export const editTodo = (id, todoName) => (
    {
        type: EDIT_TODO,
        payload: {
            id,
            todoName
        }
    }
)

export const deleteTodo = (id) => (
    {
        type: DELETE_TODO,
        payload: {
            id
        }
    }
)