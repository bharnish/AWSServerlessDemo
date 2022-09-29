import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecordAddEditComponent } from './record-add-edit/record-add-edit.component';
import { RecordsListComponent } from './records-list/records-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'records/add', component: RecordAddEditComponent},
  {path: 'records/edit/:id', component: RecordAddEditComponent},
  {path: 'records', component: RecordsListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
