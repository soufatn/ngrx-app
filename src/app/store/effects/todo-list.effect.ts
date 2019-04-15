import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@NGRX/effects';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TodoListModule } from '@Actions/todo-list.action';
import { TodoListService } from '@Services/todo-list.service';
@Injectable()
export class TodoListEffects {
    // Ecoute les actions passées dans le store
    @Effect() LoadTodos$: Observable<TodoListModule.Actions> = this.actions$
        .pipe(
            // Si l'action est de type 'LOAD_INIT_TODOS', applique la suite sinon ne fait rien
            ofType(TodoListModule.ActionTypes.LOAD_INIT_TODOS),
            // l'action du switchMap est l'objet d'action qui est récupérer dans le ofType
            // action = { type: '[todoList] Load Init Todos' }
            switchMap(action => this.todoListService.getTodos())
            // Dans le switchMap, on éxécute le service qui retournera la réponse dans le map suivant
            // todos = Todo[]
            // Il n'y a plus qu'à renvoyer une action SuccessInitTodos avec les todos en params
            map(todos => new TodoListModule.SuccessInitTodos(todos))
            // Si le resolve n'a pas abouti, il passe dans la fonction catchError
            // Qui renvoie l'action ErrorInitTodos
            catchError(() => new TodoListModule.ErrorInitTodos())
        );

    constructor(
        private todoListService: TodoListService,
        private actions$: Actions
    ) {}
}