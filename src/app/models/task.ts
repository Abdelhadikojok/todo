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

export interface GroupedTask{
  category : {
    categoryId : number,
    name:string
  }
  tasks : Task[]
}
