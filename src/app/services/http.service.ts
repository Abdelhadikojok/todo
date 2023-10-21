import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { GroupedTask, Task } from '../models/task';
import { Category } from '../models/category';

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
}
