import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO } from './actionTypes'

const initialTodoState = []

export const todos = (state = initialTodoState, action) => {
    switch (action.type) {
        case ADD_TODO: {
            return [
                ...state, {
                    id: action.payload.id,
                    bucketId: action.payload.bucketId,
                    todoName: action.payload.todoName,
                    completed: false,
                }
            ]
            //    return (
            //        {
            //            ...state,
            //            data: {
            //                ...state.data,
            //                [state.nextId]: {
            //                    bucketId: action.payload.bucketId,
            //                    todoName: action.payload.todoName,
            //                    completed: false,
            //                },
            //            },
            //            nextId: state.nextId + 1
            //        }
            //    )
        }
        case TOGGLE_TODO: {
            return state.map(todo =>
                (todo.id === action.payload.id)
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
            //return (
            //    {
            //        ...state,
            //        data: {
            //            ...state.data,
            //            [action.payload.id]: {
            //                ...state.data[action.payload.id],
            //                completed: !(state.data[action.payload.id].completed)
            //            }
            //        }
            //    }
            //)
        }

        case EDIT_TODO: {
            return state.map(todo =>
                (todo.id === action.payload.id)
                    ? { ...todo, todoName: action.payload.todoName }
                    : todo
            )
        }

        case DELETE_TODO: {
            const numIndex = parseInt(action.payload.id)
            return state.filter(todo => todo.id !== numIndex)
        }

        //return {
        //    ...state,
        //    data: {
        //        ...state.data,
        //        [action.payload.id]: {
        //            ...state.data[action.payload.id],
        //            ...state.data.filter((item, index) => index !== state.data[action.payload.id])
        //        }
        //    }
        //}

        default: {
            return state
        }
    }
}
