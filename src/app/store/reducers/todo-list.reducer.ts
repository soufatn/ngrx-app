import { TodoListState } from '../../models/todo';
import { TodoListModule } from '../actions/todo-list.action';

// les valeurs par défaut du state
const initialState: TodoListState = {
    data: [],
    loading: false,
    loaded: false,
    selectedTodo: undefined
};

// lafonction reducer de la todo
export function todosReducer(
    state: TodoListState = initialState,
    action: TodoListModule.Actions
): TodoListState {
    switch (action.type) {
        // L'action de LOAD_INIT_TODOS
        case TodoListModule.ActionTypes.LOAD_INIT_TODOS:
            // Passe le loading a true
            return {
                ...state,
                loading: true
            };
        case TodoListModule.ActionTypes.SUCCESS_INIT_TODOS:
            // Bind state.data avec les todos du server
            // Passe le loaded a true et le loading a false
            return {
                ...state,
                loading: false,
                loaded: true,
                data: action.payload
            };
        case TodoListModule.ActionTypes.ERROR_INIT_TODOS:
            // Error rend le loading a false
            return {
                ...state,
                loading: false
            };
        case TodoListModule.ActionTypes.CREATE_TODO:
            return {
                ...state,
                data: [
                    ...state.data,
                    action.payload
                ]
            };
        case TodoListModule.ActionTypes.DELETE_TODO:
            return {
                ...state,
                data : state.data.filter(todo => todo.id !== action.payload)
            };
        case TodoListModule.ActionTypes.SELECT_TODO:
            return {
                ...state,
                selectedTodo: action.payload
            };
        case TodoListModule.ActionTypes.UPDATE_TODO:
            return {
                ...state,
                data: state.data
                    .map(todo => action.payload.id === todo.id ? action.payload : todo)
            };
        default:
            return state;
    }
}
