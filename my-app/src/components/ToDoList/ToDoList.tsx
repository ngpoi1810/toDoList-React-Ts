import { useEffect, useState } from 'react'
import { Todo } from '../../@types/todo.type'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './toDoList.module.scss'

interface HandleNewTodos {
  (todos: Todo[]): Todo[]
}
const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  const newTodosObj = handleNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

export default function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currTodo, setCurrTodo] = useState<Todo | null>(null)

  const doneTodos = todos.filter((todo) => todo.done)
  const notDoneTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todosObj)
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
    //Thêm vào local storage
    syncReactToLocal((todosObj: Todo[]) => [...todosObj, todo])
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
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === (currTodo as Todo).id) {
          return currTodo as Todo
        }
        return todo
      })
    }
    setTodos(handler)
    setCurrTodo(null)
    syncReactToLocal(handler)
  }
  const delTodo = (id: string) => {
    if (currTodo) {
      setCurrTodo(null)
    }
    const handler = (todosObj: Todo[]) => {
      const findedIndexTodo = todosObj.findIndex((todo) => todo.id === id)
      if (findedIndexTodo > -1) {
        const result = [...todosObj]
        result.splice(findedIndexTodo, 1)
        return result
      }
      return todosObj
    }
    setTodos(handler)
    syncReactToLocal(handler)
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
