import { createSelector } from '@ngrx/store';
import { AppState } from '..';

// La première fonction amène vers le state todos
export const selectTodoListState$ = (state: AppState) => state.todos;

// Et à partir de celle-ci, on crée une autre fonction qui renverra data
export const selectTodos$ = createSelector(selectTodoListState$, (todos) => todos.data);

export const selectTodoSelected$ = createSelector(selectTodoListState$, (todos) => todos.selectedTodo);
