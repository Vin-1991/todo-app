import { ADD_TODO_BUCKET, DELETE_TODO_BUCKET, EDIT_TODO_BUCKET } from './actionTypes'

const initialTodoBucketState = []

export const todoBuckets = (state = initialTodoBucketState, action) => {
    switch (action.type) {
        case ADD_TODO_BUCKET: {
            return [
                ...state, {
                    bucketId: action.payload.bucketId,
                    bucketName: action.payload.bucketName,
                    incompeleteCount: action.payload.incompeleteCount,
                    completedCount: action.payload.completedCount,
                    createdTime: action.payload.createdTime,
                }
            ]
            //return (
            //    {
            //        ...state,
            //        data: {
            //            ...state.data,
            //            [state.nextBucketId]: {
            //                bucketName: action.payload.bucketName,
            //                incompeleteCount: action.payload.incompeleteCount,
            //                completedCount: action.payload.completedCount,
            //                createdTime: action.payload.createdTime,
            //                todoList: [],
            //                deleted: false
            //            },
            //        },
            //        nextBucketId: state.nextBucketId + 1
            //    }
            //)
        }

        case EDIT_TODO_BUCKET: {
            return (
                {
                    ...state,
                    data: {
                        ...state.data,
                        [action.payload.id]: {

                        }
                    }
                }
            )
        }

        case DELETE_TODO_BUCKET: {
            const numIndex = parseInt(action.payload.bucketId);
            return state.filter(todo => todo.bucketId !== numIndex);
        }

        default: {
            return state
        }
    }
}