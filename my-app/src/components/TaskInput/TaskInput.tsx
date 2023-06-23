import { useState } from 'react'
import styles from './taskInput.module.scss'

interface TaskInputProps {
  addTodo: (name: string) => void
}
export default function TaskInput(props: TaskInputProps) {
  const { addTodo } = props
  const [name, setName] = useState<string>('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo(name)
    setName('')
  }
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setName(value)
  }
  return (
    <div>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='Caption go here' value={name} onChange={onChangeInput} />
        <button type='submit'>➕</button>
      </form>
    </div>
  )
}
