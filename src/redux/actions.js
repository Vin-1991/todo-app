import { ADD_TODO_BUCKET, EDIT_TODO_BUCKET, DELETE_TODO_BUCKET, OPEN_MODAL } from './actionTypes'
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actionTypes'


export const addTodoBucket = (bucketName, incompeleteCount, completedCount, createdTime) => (
    {
        type: ADD_TODO_BUCKET,
        payload: {
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

export const deleteTodoBucket = (id) => (
    {
        type: DELETE_TODO_BUCKET,
        payload: {
            id
        }
    }
)


export const open_modal = (currentState, bucketData) => (
    {
        type: OPEN_MODAL,
        payload: {
            currentState,
            bucketData
        }
    }
)

export const addTodo = (todoName) => (
    {
        type: ADD_TODO,
        payload: {
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

export const deleteTodo = (id) => (
    {
        type: DELETE_TODO,
        payload: {
            id
        }
    }
)