import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodoComponent } from './components/todo/todo.component';
import { UnautherizedComponent } from './components/unautherized/unautherized.component';
import { authGuard } from './helpers/auth.guard';
import { AddTaskComponent } from './components/add-task/add-task.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // {path: "todo" , component: TodoComponent , canActivate: [authGuard]},
  {path : "login" ,component : LoginComponent},
  {path : "unAutherized" , component:UnautherizedComponent},
  {path : "addTask",component : AddTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
