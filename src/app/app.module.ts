import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { CloseOutsideDirective } from './directives/close-outside.directive';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UnautherizedComponent } from './components/unautherized/unautherized.component';
import { TodoComponent } from './components/todo/todo.component';
import { TaskComponent } from './components/todo/task/task.component';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AlertNotifyComponent } from './components/alert-notify/alert-notify.component';
import { InfoDirective } from './directives/info.directive';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    CloseOutsideDirective,
    UnautherizedComponent,
    TodoComponent,
    TaskComponent,
    AddTaskComponent,
    AlertNotifyComponent,
    InfoDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
