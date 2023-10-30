import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Task } from 'src/app/models/task';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit , OnDestroy{
  estimateDateNumber:number=0
  estimateDateUnit:string=""

  task : Task = {
    categoryId : 0,
    status: "",
    dueDate: "",
    estimateDatenumber:null ,
    estimateDateUnit:null,
    title: "",
    importance : ""
  }


  categories : Category[] = []

  private categoriesSubscription!: Subscription;
  private addTaskSubscription!: Subscription;



  constructor(private http : HttpService,private alertService : AlertService){

  }

  ngOnInit(): void {
    this.getCategories()



  }


  getCategories(){
    this.categoriesSubscription = this.http.getCategories().subscribe(res=>{
      this.categories = res
    })
  }

  onSubmit(form:NgForm){
    console.log("-----",this.task)
    this.addTaskSubscription = this.http.addTask(this.task).subscribe(res=>{
      console.log(res);
      this.alertService.alertMode.next(true)
    },err=>{
      this.alertService.alertMode.next(false)

    })
    form.reset()
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
    if (this.addTaskSubscription) {
      this.addTaskSubscription.unsubscribe();
    }
  }
}
