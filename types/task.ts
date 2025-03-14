export interface Task {
    _id: string
    title: string
    description: string
    dueDate: string
    priority: "Low" | "Medium" | "High"
    status: "Pending" | "Completed"
    userId: string
    createdAt: string
    updatedAt: string
  }
  
  