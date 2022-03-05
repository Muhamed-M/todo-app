import { React } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import './todo.css';

const Todo = ({ task, onCompleted, onDeleteTask }) => {
  return (
    <li className='todo'>
      <span 
        className={task.completed ? 'custom-checkbox active' : 'custom-checkbox'}
        onClick={() => onCompleted(task.id)}
      ></span>
      <p className={task.completed ? 'completed-todo' : ''}>{task.body}</p>
      <RiCloseLine
        size={24}
        style={{position: 'absolute', right: '10px', cursor: 'pointer'}}
        onClick={() => onDeleteTask(task.id)}
      />
    </li>
  )
}

export default Todo;