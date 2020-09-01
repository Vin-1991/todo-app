import { ADD_TODO_BUCKET, DELETE_TODO_BUCKET, ADD_TODO_BUCKET_COUNT } from './actionTypes'

const initialTodoBucketState = []

export const todoBuckets = (state = initialTodoBucketState, action) => {
    switch (action.type) {
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

        case DELETE_TODO_BUCKET: {
            const numIndex = parseInt(action.payload.bucketId);
            return state.filter(todo => todo.bucketId !== numIndex);
        }

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