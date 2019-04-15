import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '@Models/todo';
import { AppState } from '@StoreConfig';
import { Store, select } from '@ngrx/store';
import { TodoListModule } from '@Actions/todo-list.action';
import { selectTodoListState$, selectTodosLoading$, selectTodos$ } from '@Selectors/todo-list.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss']
})
export class AllTodosComponent implements OnInit {
  public todos$: Observable<Todo[]>;
  public todosLoading: Observable<boolean>;
  public todoForm: FormGroup;
  private todosLength: number;

  constructor(
    private store: Store<AppState>,
    @Inject(FormBuilder) fb: FormBuilder,
    private router: Router,
  ) {
    // On remplace la fonction par le sélecteur
    this.todos$ = store.pipe(
      select(selectTodos$),
      tap((todos) => {
        this.todosLength = todos.length;
      })
    );
    this.todoForm = fb.group({
      title: ['', Validators.required],
      completed: [false, Validators]
    });
    this.todosLoading = store.pipe(select(selectTodosLoading$));
  }

  createTodo(todo: Todo) {
    const payload = {
      ...todo,
      userId: 1,
      id: this.todosLength + 1
    };
    this.store.dispatch(new TodoListModule.CreateTodo(payload));
    this.todoForm.reset();
  }

  deleteTodo(id: number) {
    this.store.dispatch(new TodoListModule.DeleteTodo(id));
  }

  selectTodo(todo) {
    this.store.dispatch(new TodoListModule.SelectTodo(todo));
    this.router.navigate(['/todo-list/select-todo']);
  }

  ngOnInit() {
    this.store.dispatch(new TodoListModule.LoadInitTodos());
  }
}
