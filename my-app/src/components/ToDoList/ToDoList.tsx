import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './toDoList.module.scss'
import { Todo } from '../../@types/todo.type'
export default function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currTodo, setCurrTodo] = useState<Todo | null>(null)

  const doneTodos = todos.filter((todo) => todo.done)
  const notDoneTodos = todos.filter((todo) => !todo.done)
  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
    //Thêm vào local storage
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    const newTodosObj = [todos, todo]
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
  const startEditTodo = (id: string) => {
    const findedTodo = todos.find((todo) => todo.id === id)
    if (findedTodo) {
      setCurrTodo(findedTodo)
    }
  }
  const editTodo = (name: string) => {
    setCurrTodo((prev) => {
      if (prev) {
        return { ...prev, name }
      }
      return null
    })
  }
  const finishEditTodo = () => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === (currTodo as Todo).id) {
          return currTodo as Todo
        }
        return todo
      })
    })
    setCurrTodo(null)
  }
  const delTodo = (id: string) => {
    if (currTodo) {
      setCurrTodo(null)
    }
    setTodos((prev) => {
      const findedIndexTodo = prev.findIndex((todo) => todo.id === id)
      if (findedIndexTodo > -1) {
        const result = [...prev]
        result.splice(findedIndexTodo, 1)
        return result
      }
      return prev
    })
  }
  return (
    <div className={styles.wrapper}>
      <TaskInput addTodo={addTodo} currTodo={currTodo} editTodo={editTodo} editFinishTodo={finishEditTodo} />
      <TaskList todos={notDoneTodos} handleDoneTodo={handleDoneTodo} startEditTodo={startEditTodo} delTodo={delTodo} />
      <TaskList
        doneTaskList
        todos={doneTodos}
        handleDoneTodo={handleDoneTodo}
        startEditTodo={startEditTodo}
        delTodo={delTodo}
      />
    </div>
  )
}
