'use client'

import { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TodoProps {
  id: number
  text: string
  completed: boolean
  onUpdate: (id: number, text: string, completed: boolean) => void
  onDelete: (id: number) => void
}

export function Todo({ id, text, completed, onUpdate, onDelete }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(text)

  const handleUpdate = () => {
    onUpdate(id, editText, completed)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={completed}
        onCheckedChange={(checked) => onUpdate(id, text, checked as boolean)}
      />
      {isEditing ? (
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleUpdate}
          onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
          className="flex-grow"
        />
      ) : (
        <span className={`flex-grow ${completed ? 'line-through' : ''}`}>{text}</span>
      )}
      <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Save' : 'Edit'}
      </Button>
      <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>Delete</Button>
    </div>
  )
}

