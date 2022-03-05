import { React } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import './todo.css';

let dragedIndex;

const Todo = ({ task, onCompleted, onDeleteTask, setTasks }) => {
  // Drag & drop tasks
  const handleDragStart = (event) => {
    dragedIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
  };

  const handleDragEnter = (event) => {
    event.target.classList.add('drag-over');
  };

  const handleDragLeave = (event) => {
    event.target.classList.remove('drag-over');
  };
  
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  
  const handleDrop = (event) => {
    let dropedIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
    setTasks(prevState => {
      let data = [...prevState];

      let temp = data[dragedIndex];
      data[dragedIndex] = data[dropedIndex];
      data[dropedIndex] = temp;

      return data;
    });
    event.target.classList.remove('drag-over');
  };

  return (
    <li className='todo' draggable='true'
        onDragStart={handleDragStart}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
    >
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