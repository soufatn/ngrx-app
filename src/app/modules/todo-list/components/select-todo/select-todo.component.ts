import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Todo } from '@Models/todo';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '@StoreConfig';
import { tap } from 'rxjs/operators';

import { selectTodoSelected$ } from '@Selectors/todo-list.selector';
import { TodoListModule } from '@Actions/todo-list.action';

@Component({
    selector: 'app-select-todo',
    styleUrls: ['./select-todo.component.scss'],
    templateUrl: './select-todo.component.html '
})
export class SelectTodoComponent implements OnInit {

    public updateTodoForm: FormGroup;
    public selectTodo$: Observable<Todo>;
    public selectTodo: Todo;
    constructor(
        private store: Store<AppState>,
        private router: Router,
        @Inject(FormBuilder) fb: FormBuilder
    ) {
        this.selectTodo$ = store.pipe(
            select(selectTodoSelected$),
            tap(selectTodos => {
                this.selectTodo = selectTodos;
            })
        );
        this.selectTodo$.subscribe();
        this.updateTodoForm = fb.group({
            title: ['', Validators.required],
            completed: [false, Validators]
        });
    }

    ngOnInit() {
        if (this.selectTodo) {
            this.updateTodoForm.patchValue({
                title: this.selectTodo.title,
                completed: this.selectTodo.completed
            });
        }
    }

    updateTodo(formValue) {
        const payload = Object.assign(this.selectTodo, formValue);
        this.store.dispatch(new TodoListModule.UpdateTodo(payload));
        return this.router.navigate(['/todo-list/all-todos']);
    }
}
