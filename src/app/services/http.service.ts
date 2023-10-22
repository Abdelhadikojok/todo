import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { GroupedTask, Task } from '../models/task';
import { Category } from '../models/category';
import { Observable, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  getTasks(){
    return this.http.get<GroupedTask[]>(`${environment.apiUrl}/getTasks`)
  }

  getCategories(){
    return this.http.get<Category[]>(`${environment.apiUrl}/getCategories`)
  }

  addTask(task : Task){
    return this.http.post(`${environment.apiUrl}/addTasks`,task)
  }

  updateTask(task:Task){
    return this.http.put(`${environment.apiUrl}/updateTask`,task)
  }

  deleteTask(taskid : number){
    return this.http.delete(`${environment.apiUrl}/deleteTask?taskid=${taskid}`)
  }
  getFilteredTaskCards(title: string){
    const params = new HttpParams().set('title', title);
    return this.http.get<GroupedTask[]>(`${environment.apiUrl}/filter`, { params });
  }
}
