import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './toDoList.module.scss'
import { Todo } from '../../@types/todo.type'
export default function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([])

  const doneTodos = todos.filter((todo) => todo.done)
  const notDoneTodos = todos.filter((todo) => !todo.done)
  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
  }
  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }
  console.log(todos)
  return (
    <div className={styles.wrapper}>
      <TaskInput addTodo={addTodo} />
      <TaskList todos={notDoneTodos} handleDoneTodo={handleDoneTodo} />
      <TaskList doneTaskList todos={doneTodos} handleDoneTodo={handleDoneTodo} />
    </div>
  )
}
