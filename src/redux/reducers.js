import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actionTypes'

const initialTodoState = {
    nextId: 2,
    data: {}
}

export const todos = (state = initialTodoState, action) => {
    switch (action.type) {
        case ADD_TODO: {
            return (
                {
                    ...state,
                    data: {
                        ...state.data,
                        [state.nextId]: {
                            todoName: action.payload.todoName,
                            completed: false
                        },
                    },

                    nextId: state.nextId + 1
                }
            )
        }
        case TOGGLE_TODO: {
            console.log(action.payload)
            return (
                {
                    ...state,
                    data: {
                        ...state.data,
                        [action.payload.id]: {
                            ...state.data[action.payload.id],
                            completed: !(state.data[action.payload.id].completed)
                        }
                    }
                }
            )
        }

        case DELETE_TODO:
            return {
                ...state,
                ...state.data.filter((item, index) => index !== state.data[action.payload.id])
            }

        default: {
            return state
        }
    }
}
