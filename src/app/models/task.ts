export interface Task {
  taskId?:number
  categoryId : number
  status: string
  dueDate: string
  estimateDate: string
  title: string
  importance ?: string
}

export interface GroupedTask{
  category : {
    categoryId : number,
    name:string
  }
  tasks : Task[]
}
