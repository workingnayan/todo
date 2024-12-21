'use client'

import { useState, useEffect } from 'react'
import { Todo } from './Todo'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

export function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/todos')
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.error('Failed to fetch todos:', error)
      toast({
        title: "Error",
        description: "Failed to fetch todos. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() === '') return
    setIsLoading(true)
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodo })
      })
      if (!response.ok) {
        throw new Error('Failed to add todo')
      }
      const data = await response.json()
      setTodos([...todos, data])
      setNewTodo('')
      toast({
        title: "Success",
        description: "Todo added successfully!",
      })
    } catch (error) {
      console.error('Failed to add todo:', error)
      toast({
        title: "Error",
        description: "Failed to add todo. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateTodo = async (id: number, text: string, completed: boolean) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, text, completed })
      })
      if (!response.ok) {
        throw new Error('Failed to update todo')
      }
      const data = await response.json()
      setTodos(todos.map(todo => todo.id === id ? data : todo))
      toast({
        title: "Success",
        description: "Todo updated successfully!",
      })
    } catch (error) {
      console.error('Failed to update todo:', error)
      toast({
        title: "Error",
        description: "Failed to update todo. Please try again.",
        variant: "destructive",
      })
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }
      setTodos(todos.filter(todo => todo.id !== id))
      toast({
        title: "Success",
        description: "Todo deleted successfully!",
      })
    } catch (error) {
      console.error('Failed to delete todo:', error)
      toast({
        title: "Error",
        description: "Failed to delete todo. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading && todos.length === 0) {
    return <div className="text-center">Loading todos...</div>
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={addTodo} className="flex space-x-2 mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Todo'}
        </Button>
      </form>
      <div className="space-y-2">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
      {todos.length === 0 && (
        <p className="text-center text-gray-500">No todos yet. Add one above!</p>
      )}
    </div>
  )
}

