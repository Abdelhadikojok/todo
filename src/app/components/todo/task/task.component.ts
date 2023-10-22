import { Component, Output, EventEmitter, Input } from '@angular/core';
import { GroupedTask, Task } from 'src/app/models/task';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  updatemode : boolean = false
  @Input() task : Task ={
      categoryId : 2,
      status: "",
      dueDate: "",
      estimateDate: "",
      title: "",
      importance : ""
    }
    @Output() taskDeleted = new EventEmitter<Task>();
    constructor(private httpServices:HttpService){}

    deleteTask(task:Task) {
      console.log(task);

      this.taskDeleted.emit(task);
    }

    changeUpdateMode(task:Task){
      this.updatemode = !this.updatemode
      const t = task
      this.task = task
    }

    UpdateTask(task: Task){
      this.updatemode = false
      this.httpServices.updateTask(task).subscribe()

      console.log("this is",task);

    }
}
