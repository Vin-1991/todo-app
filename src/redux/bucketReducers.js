import { ADD_TODO_BUCKET, DELETE_TODO_BUCKET, ADD_TODO_BUCKET_COUNT } from './actionTypes';

const initialTodoBucketState = []

export const todoBuckets = (state = initialTodoBucketState, action) => {
    switch (action.type) {

        //Add Bucket ToDo Reducer
        case ADD_TODO_BUCKET: {
            return [
                ...state, {
                    bucketId: action.payload.bucketId,
                    bucketName: action.payload.bucketName,
                    incompeleteCount: 0,
                    completedCount: 0,
                    createdTime: action.payload.createdTime,
                }
            ]
        }

        //Delete Bucket ToDo Reducer
        case DELETE_TODO_BUCKET: {
            const numIndex = parseInt(action.payload.bucketId);
            return state.filter(todo => todo.bucketId !== numIndex);
        }

        //Add Bucket ToDo Count Reducer
        case ADD_TODO_BUCKET_COUNT: {
            return state.map(todo =>
                (todo.bucketId === action.payload.bucketId)
                    ? { ...todo, incompeleteCount: action.payload.incompeleteCount, completedCount: action.payload.completedCount }
                    : todo
            )
        }

        default: {
            return state
        }
    }
}