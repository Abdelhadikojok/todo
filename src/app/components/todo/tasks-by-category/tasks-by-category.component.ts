import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks-by-category',
  templateUrl: './tasks-by-category.component.html',
  styleUrls: ['./tasks-by-category.component.css']
})
export class TasksByCategoryComponent {
  @Input() tasks : Task[] =[]
}
