import { type ChangeEvent, type FormEvent, useRef, useState } from 'react'
import './App.css'

type Todo = {
  id: number
  text: string
  done: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('')
  const nextId = useRef(1)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmed = text.trim()
    if (!trimmed) return

    setTodos(prev => [...prev, { id: nextId.current++, text: trimmed, done: false }])
    setText('')
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
  }

  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <main className="app">
      <h1>Todo List</h1>

      <form id="f" className="todo-form" autoComplete="off" onSubmit={handleSubmit}>
        <input
          id="inp"
          type="text"
          placeholder="할 일을 입력하고 Enter"
          value={text}
          onChange={handleInput}
          required
        />
        <button type="submit">추가</button>
      </form>

      <ul id="list" className="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className={todo.done ? 'done' : undefined}>{todo.text}</span>
            </label>
            <button type="button" aria-label={`${todo.text} 삭제`} onClick={() => removeTodo(todo.id)}>
              X
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p className="empty">할 일이 없습니다.</p>}
    </main>
  )
}

export default App
