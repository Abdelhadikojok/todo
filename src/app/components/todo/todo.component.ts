import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpService } from 'src/app/services/http.service';
import { GroupedTask, Task } from 'src/app/models/task';
import { TaskOne, Tasks } from 'src/app/models/task-one';
import { Category } from 'src/app/models/category';
import { AlertService } from 'src/app/services/alert.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit ,OnDestroy{
  tasks  : Tasks[] =[]
  Categories : Category[] =[]
  categoryHeaderImages : any[] = [
    "../../../assets/ToDoIcon.svg",
    "../../../assets/DoingIcon.svg",
    "../../../assets/DoneIcon.svg"
  ]
  deleteMode : boolean = false;
  tasktodelete : TaskOne ={
    taskId:0,
    categoryId :0,
    status: "",
    dueDate: "",
    estimateDatenumber:null,
    estimateDateUnit:null,
    title: "",
    importance :"",
    name : ""
  }
  filterTitle : string = ""

  dataSubscription !: Subscription
  getCategoriesSubscription !: Subscription
  getTaskSubscription !: Subscription
  deleteTaskSubscription !: Subscription
  getFilteredTaskSubscription !: Subscription

  constructor(private httpService:HttpService,private alertService:AlertService){}

  ngOnInit(): void {
      this.getTasks()
      this.getCategories()
      this.dataSubscription = this.httpService.dataSubject.subscribe(res=>{
        this.filterTitle = res
        console.log(res);
        this.loadTaskCards();
      }
      )
  }


  getTasks(){
    this.getTaskSubscription = this.httpService.getTaskOne().subscribe(res=>{
      this.tasks = res

    })
  }

  onTaskDeleted(task: Task) {
    console.log('Task deleted:', task);
    this.tasktodelete = task

  }

  ChangeDeleteMode(mode : boolean){
    this.deleteMode = mode
  }

  // .subscribe
  deleteTask() {
    if (this.tasktodelete.taskId) {
      this.deleteTaskSubscription=this.httpService.deleteTask(this.tasktodelete.taskId).subscribe(
        (res) => {
          this.alertService.alertMode.next(true);

          this.getTasks()
        },
        (err) => {
          this.alertService.alertMode.next(false);
        }
      );
    }

    this.deleteMode = false;
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
        console.log("the category id is : ",newCategoryId);

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
      this.httpService.updateTask({...task,categoryId :newCategoryId}).subscribe((updatedTask) => {
        console.log('Task category updated:', updatedTask);
        this.alertService.alertMode.next(true)
      },err=>{
        this.alertService.alertMode.next(false)
      });
    }
  }

  getCategories(){
    this.getCategoriesSubscription = this.httpService.getCategories().subscribe(res=>{
      this.Categories = res
      console.log(res);

    })
  }

  loadTaskCards() {
    if(this.filterTitle != ""){
      this.getFilteredTaskSubscription = this.httpService.getFilteredTaskCards(this.filterTitle).subscribe(
        (data: Tasks[]) => {

          this.tasks = data
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


  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe()
    }
    if (this.getCategoriesSubscription) {
      this.dataSubscription.unsubscribe()
    }
    if (this.getTaskSubscription) {
      this.dataSubscription.unsubscribe()
    }
    if (this.deleteTaskSubscription) {
      this.deleteTaskSubscription.unsubscribe()
    }
    if (this.getFilteredTaskSubscription) {
      this.deleteTaskSubscription.unsubscribe()
    }

  }

}
