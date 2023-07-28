import { Todo } from '../../@types/todo.type'
import PropTypes from 'prop-types'
import styles from './taskList.module.scss'
import { TodoTypes } from '../../PropTypes/todo.proptype'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  delTodo: (id: string) => void
}
export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneTodo, startEditTodo, delTodo } = props
  const onChangeCheckbox = (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneTodo(idTodo, event.target.checked)
  }
  return (
    <div className={styles.taskList}>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input type='checkbox' checked={todo.done} onChange={onChangeCheckbox(todo.id)} />
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
            <div className={styles.taskAction}>
              <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>
                ✏️
              </button>
              <button className={styles.taskBtn} onClick={() => delTodo(todo.id)}>
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
TaskList.prototype = {
  doneTaskList: PropTypes.bool,
  todos: PropTypes.arrayOf(TodoTypes),
  handleDoneTodo: PropTypes.func,
  startEditTodo: PropTypes.func,
  delTodo: PropTypes.func
}
