import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Task } from 'src/app/models/task';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit , OnDestroy{
  task : Task = {
    categoryId : 0,
    status: "",
    dueDate: "",
    estimateDate: "",
    title: ""
  }


  categories : Category[] = []

  private categoriesSubscription!: Subscription;



  constructor(private http : HttpService){

  }

  ngOnInit(): void {
    this.getCategories()

  }


  getCategories(){
    this.categoriesSubscription = this.http.getCategories().subscribe(res=>{
      this.categories = res
    })
  }

  onSubmit(){
    console.log(this.task)
    this.http.addTask(this.task).subscribe(res=>{
      console.log(res);
    })
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
