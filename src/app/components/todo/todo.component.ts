import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpService } from 'src/app/services/http.service';
import { GroupedTask, Task } from 'src/app/models/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks : GroupedTask[] = []
  todoTask : Task [] = []
  doingTask : Task [] = []
  doneTask : Task [] = []
  filterTitle : string = ""

  constructor(private httpService:HttpService){}

  ngOnInit(): void {
      this.getTasks()
      this.httpService.dataSubject.subscribe(res=>{
        this.filterTitle = res
        console.log(res);

        this.loadTaskCards();
      }
      )
  }


  getTasks(){
    this.httpService.getTasks().subscribe(res=>{
      this.tasks = res
      console.log(res)
      if(res[0]){
        this.todoTask = this.tasks[0].tasks
      }
      if(res[1]){
        this.doingTask = this.tasks[1].tasks
      }
      if(res[2]){
        this.doneTask = this.tasks[2].tasks
      }

    })
  }

  onTaskDeleted(task: Task) {
    console.log('Task deleted:', task);
    if(task.taskId){
      this.httpService.deleteTask(task.taskId).subscribe();
      this.todoTask = this.todoTask.filter((t) => t.taskId !== task.taskId);
      this.doingTask = this.doingTask.filter((t) => t.taskId !== task.taskId);
      this.doneTask = this.doneTask.filter((t) => t.taskId !== task.taskId);
      }

  }


  drop(event: CdkDragDrop<Task[]>, newCategoryId: number) {
    if (event.previousContainer === event.container) {
      // Reorder tasks within the same category
      if (event.container.data) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      }
    } else {

      const taskToMove = event.previousContainer.data[event.previousIndex];
      if (taskToMove) {
        this.updateTaskCategory(taskToMove, newCategoryId);
        if (event.container.data) {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          );
        }
      }
    }
  }

  updateTaskCategory(task: Task, newCategoryId: number) {
    if (task.categoryId !== newCategoryId) {
      task.categoryId = newCategoryId;
      console.log({...task,categoryId :newCategoryId});

      this.httpService.updateTask({...task,categoryId :newCategoryId}).subscribe((updatedTask) => {
        console.log('Task category updated:', updatedTask);
      });
    }
  }



  loadTaskCards() {
    if(this.filterTitle != ""){
      this.httpService.getFilteredTaskCards(this.filterTitle).subscribe(
        (data: GroupedTask[]) => {
          this.tasks = data
          if(data[0]){
            this.todoTask = this.tasks[0].tasks
          }
          if(data[1]){
            this.doingTask = this.tasks[1].tasks
          }
          if(data[2]){
            this.doneTask = this.tasks[2].tasks
          }
          console.log(data);

        },
        (error) => {
          console.error('Error loading task cards:', error);
        }
      );
    }else{
      this.getTasks()
    }
  }

}
