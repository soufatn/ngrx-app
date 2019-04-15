import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/todo';
import { AppState } from './store';
import { Store, select } from '@ngrx/store';
import { TodoListModule } from './store/actions/todo-list.action';
import { selectTodos$ } from './store/selectors/todo-list.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
