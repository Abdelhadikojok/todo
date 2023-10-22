import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-tasks-by-category',
  templateUrl: './tasks-by-category.component.html',
  styleUrls: ['./tasks-by-category.component.css']
})
export class TasksByCategoryComponent {
  @Input() tasks : Task[] =[]

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,);

  }
}
