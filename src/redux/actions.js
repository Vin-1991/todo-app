import { ADD_TODO_BUCKET, DELETE_TODO_BUCKET, ADD_TODO_BUCKET_COUNT } from './actionTypes'
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO, DELETE_ALL_TODOS } from './actionTypes'


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

export const deleteTodoBucket = (bucketId) => (
    {
        type: DELETE_TODO_BUCKET,
        payload: {
            bucketId
        }
    }
)

export const addTodoBucketCount = (bucketId, completedCount, incompeleteCount) => (
    {
        type: ADD_TODO_BUCKET_COUNT,
        payload: {
            bucketId,
            completedCount,
            incompeleteCount
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

export const deleteTodo = (id, ) => (
    {
        type: DELETE_TODO,
        payload: {
            id
        }
    }
)

export const deleteAllTodos = (bucketId) => (
    {
        type: DELETE_ALL_TODOS,
        payload: {
            bucketId
        }
    }
)