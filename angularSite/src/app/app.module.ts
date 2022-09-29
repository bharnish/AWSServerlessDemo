import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ApiModule } from './api/api.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RecordAddEditComponent } from './record-add-edit/record-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecordAddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ApiModule.forRoot({rootUrl: environment.rootUrl}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
