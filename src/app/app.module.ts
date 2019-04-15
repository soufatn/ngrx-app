import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { REDUCER_TOKEN, getReducers } from './store';
import { appRouting } from './app.routing';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // ReactiveFormsModule,
    // FormsModule,
    appRouting,
    StoreModule.forRoot(REDUCER_TOKEN)
  ],
  providers: [
    {provide: REDUCER_TOKEN, useFactory: getReducers}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
