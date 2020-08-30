import { ADD_TODO_BUCKET, EDIT_TODO_BUCKET, DELETE_TODO_BUCKET } from './actionTypes'
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, SET_FILTER } from './actionTypes'


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


export const addTodo = (content) => (
    {
        type: ADD_TODO,
        payload: {
            content
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

export const setFilter = (filter) => (
    {
        type: SET_FILTER,
        payload: {
            filter
        }
    }
)

