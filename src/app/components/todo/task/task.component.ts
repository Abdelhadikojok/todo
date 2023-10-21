import { Component, Input } from '@angular/core';
import { GroupedTask, Task } from 'src/app/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task : Task ={
      categoryId : 1,
      status: "",
      dueDate: "",
      estimateDate: "",
      title: "",
      importance : ""
    }
}
