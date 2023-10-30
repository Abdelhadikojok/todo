import { Component, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnDestroy{
  @Input() InToDoComponent : boolean = true
  updatemode : boolean = false
  @Input() task : Task={
      categoryId : 2,
      status: "",
      dueDate: "",
      estimateDatenumber: null,
      estimateDateUnit:"",
      title: "",
      importance : ""
    }
    @Output() taskDeleted = new EventEmitter<Task>();
    @Output() deletMode = new EventEmitter<boolean>();

    updateTaskSubscription !: Subscription
    constructor(private httpServices:HttpService ,private alertService:AlertService){}

    deleteTask(task:Task) {
      console.log(task);
      this.deletMode.emit(true)
      this.taskDeleted.emit(task);
    }

    changeUpdateMode(task:Task){
      this.updatemode = !this.updatemode
      const t = task
      this.task = task
    }


    UpdateTask(task: Task){
      this.updatemode = false
      this.updateTaskSubscription=this.httpServices.updateTask(task).subscribe(res=>{
        this.alertService.alertMode.next(true)
      },err=>{
        this.alertService.alertMode.next(false)
      })

      console.log("this is",task);

    }

    ngOnDestroy(): void {
      if (this.updateTaskSubscription) {
        this.updateTaskSubscription.unsubscribe
      }
    }
}
