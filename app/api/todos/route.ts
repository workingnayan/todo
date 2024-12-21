import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const todosPath = path.join(process.cwd(), 'data', 'todos.json')

async function getTodos() {
  const data = await fs.readFile(todosPath, 'utf8')
  return JSON.parse(data)
}

async function saveTodos(todos: any[]) {
  await fs.writeFile(todosPath, JSON.stringify(todos, null, 2))
}

export async function GET() {
  try {
    const todos = await getTodos()
    return NextResponse.json(todos)
  } catch (error) {
    console.error('Failed to read todos:', error)
    return NextResponse.json({ error: 'Failed to read todos' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json()
    const todos = await getTodos()
    const newTodo = { id: Date.now(), text, completed: false }
    todos.push(newTodo)
    await saveTodos(todos)
    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    console.error('Failed to add todo:', error)
    return NextResponse.json({ error: 'Failed to add todo' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, text, completed } = await request.json()
    const todos = await getTodos()
    const todoIndex = todos.findIndex((t: any) => t.id === id)
    if (todoIndex === -1) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }
    todos[todoIndex] = { ...todos[todoIndex], text, completed }
    await saveTodos(todos)
    return NextResponse.json(todos[todoIndex])
  } catch (error) {
    console.error('Failed to update todo:', error)
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const todos = await getTodos()
    const updatedTodos = todos.filter((t: any) => t.id !== id)
    if (updatedTodos.length === todos.length) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }
    await saveTodos(updatedTodos)
    return NextResponse.json({ message: 'Todo deleted' })
  } catch (error) {
    console.error('Failed to delete todo:', error)
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 })
  }
}

