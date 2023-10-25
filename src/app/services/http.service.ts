import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { GroupedTask, Task } from '../models/task';
import { Category } from '../models/category';
import { BehaviorSubject, Observable, debounceTime } from 'rxjs';
import { TaskOne, Tasks } from '../models/task-one';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  dataSubject = new BehaviorSubject<string>('');

  constructor(private http:HttpClient) { }

  getTasks(){
    return this.http.get<Tasks[]>(`${environment.apiUrl}/getTasks`)
  }

  getTaskOne(){
    return this.http.get<Tasks[]>(`${environment.apiUrl}/getTasks`)
  }

  getCategories(){
    return this.http.get<Category[]>(`${environment.apiUrl}/getCategories`)
  }

  addTask(task : TaskOne){
    return this.http.post(`${environment.apiUrl}/addTasks`,task)
  }

  updateTask(task:TaskOne){
    return this.http.put(`${environment.apiUrl}/updateTask`,task)
  }

  deleteTask(taskid : number){
    return this.http.delete(`${environment.apiUrl}/deleteTask?taskid=${taskid}`)
  }
  getFilteredTaskCards(title: string){
    const params = new HttpParams().set('title', title);
    return this.http.get<Tasks[]>(`${environment.apiUrl}/filter`, { params });
  }

  getUserEmail(){
    return this.http.get<User>(`${environment.apiUrl}/getUser`)
  }
}
