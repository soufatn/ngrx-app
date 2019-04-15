import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appEffects, REDUCER_TOKEN, getReducers } from './store';
import { appRouting } from './app.routing';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoListService } from './services/todo-list.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    // ReactiveFormsModule,
    // FormsModule,
    appRouting,
    StoreModule.forRoot(REDUCER_TOKEN),
    EffectsModule.forRoot(appEffects),
  ],
  providers: [
    TodoListService,
    {provide: REDUCER_TOKEN, useFactory: getReducers}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
