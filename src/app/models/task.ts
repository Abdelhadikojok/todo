export interface Task {
  taskId?:number
  categoryId : number
  status: string
  dueDate: string
  estimateDatenumber?: number|null,
  estimateDateUnit?:string|null
  title: string
  importance ?: string
  name ? : string
}


export interface Tasks {
  tasks: Task[];
}
