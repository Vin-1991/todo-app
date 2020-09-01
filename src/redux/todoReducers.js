import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO, DELETE_ALL_TODOS } from './actionTypes';

const initialTodoState = [];

export const todos = (state = initialTodoState, action) => {
    switch (action.type) {
        //Add ToDo Reducer
        case ADD_TODO: {
            return [
                ...state, {
                    id: action.payload.id,
                    bucketId: action.payload.bucketId,
                    todoName: action.payload.todoName,
                    completed: false,
                }
            ]
        }

        //Toggle ToDo Reducer
        case TOGGLE_TODO: {
            return state.map(todo =>
                (todo.id === action.payload.id)
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        }

        //Edit ToDo Reducer
        case EDIT_TODO: {
            return state.map(todo =>
                (todo.id === action.payload.id)
                    ? { ...todo, todoName: action.payload.todoName }
                    : todo
            )
        }

        //Delete ToDo Reducer
        case DELETE_TODO: {
            const numIndex = parseInt(action.payload.id);
            return state.filter(todo => todo.id !== numIndex);
        }

        //Delete All ToDo Reducer
        case DELETE_ALL_TODOS: {
            const numIndex = parseInt(action.payload.bucketId);
            return state.filter(todo => todo.bucketId !== numIndex);
        }

        default: {
            return state;
        }
    }
}
