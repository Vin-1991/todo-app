import { ADD_TODO_BUCKET, DELETE_TODO_BUCKET, EDIT_TODO_BUCKET, OPEN_MODAL } from './actionTypes'

const initialTodoBucketState = {
    nextBucketId: 1,
    data: {}
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
                            createdTime: action.payload.createdTime,
                            todoList: [{}],
                            deleted: false
                        },
                    },
                    nextBucketId: state.nextBucketId + 1
                }
            )
        }

        case EDIT_TODO_BUCKET: {
            let newList = state.data[action.payload.id];
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

        case OPEN_MODAL: {
            return (
                {
                    ...state,

                }
            )
        }


        default: {
            return state
        }
    }
}