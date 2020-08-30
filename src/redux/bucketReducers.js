import { ADD_TODO_BUCKET, DELETE_TODO_BUCKET, EDIT_TODO_BUCKET } from './actionTypes'

const initialTodoBucketState = {
    nextBucketId: 2,
    data:
    {
        1: {
            bucketName: 'Bucket 1',
            incompeleteCount: 0,
            completedCount: 0,
            createdTime: '02-02-2020'
        }
    }
}

export const todoBuckets = (state = initialTodoBucketState, action) => {
    switch (action.type) {
        case ADD_TODO_BUCKET: {
            return (
                {
                    ...state,
                    data: {
                        ...state.data,
                        [state.nextBucketId]: {
                            bucketName: action.payload.bucketName,
                            incompeleteCount: action.payload.incompeleteCount,
                            completedCount: action.payload.completedCount,
                            createdTime: action.payload.createdTime
                        },
                    },
                    nextBucketId: state.nextBucketId + 1
                }
            )
        }

        case EDIT_TODO_BUCKET: {
            return (
                {
                    ...state,
                    data: {
                        ...state.data,
                        [action.payload.id]: {
                            ...state.data[action.payload.id],
                        }
                    }
                }
            )
        }

        case DELETE_TODO_BUCKET: {
            return (
                {
                    ...state,
                    data: {
                        ...state.data,
                        [action.payload.id]: {
                            ...state.data[action.payload.id],
                        }
                    }
                }
            )
        }

        default: {
            return state
        }
    }
}