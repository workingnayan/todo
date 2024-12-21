import { TodoList } from './TodoList'
import { Toaster } from "@/components/ui/toaster"

export default function TodoPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>
      <TodoList />
      <Toaster />
    </div>
  )
}

