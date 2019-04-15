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
        // L'action de InitTodos
        case TodoListModule.ActionTypes.INIT_TODOS:
            return {
                ...state,
                data: [
                    ...action.payload
                ]
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
