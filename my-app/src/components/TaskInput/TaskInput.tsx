import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptype'

interface TaskInputProps {
  addTodo: (name: string) => void
  currTodo: Todo | null
  editTodo: (name: string) => void
  editFinishTodo: () => void
}
export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currTodo, editTodo, editFinishTodo } = props
  const [name, setName] = useState<string>('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currTodo) {
      editFinishTodo()
      if (name) setName('')
    } else if (name !== '') {
      addTodo(name)
      setName('')
    }
  }
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (currTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  return (
    <div>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Caption go here'
          value={currTodo ? currTodo.name : name}
          onChange={onChangeInput}
        />
        <button type='submit'>{currTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}
// Add prop-type
TaskInput.prototype = {
  addTodo: PropTypes.func.isRequired,
  currTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])]),
  editTodo: PropTypes.func.isRequired,
  editFinishTodo: PropTypes.func.isRequired
}
