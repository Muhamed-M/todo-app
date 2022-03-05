import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import Todo from './components/Todo/Todo';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterState, setFilterState] = useState('all');

  // STORE AND GET TASKS FROM LOCAL STORAGE
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks'));
    if (stored) setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // when task is checked
  const isCompleted = (id) => {
    setTasks(
      tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
    )
  }

  // clear completed tasks
  const handleClear = () => {
    setTasks(
      tasks.filter(task => !task.completed)
    )
  }

  // delete single task
  const deleteTask = (id) => {
    setTasks(
      tasks.filter(task => task.id !== id)
    );
  };

  // filter tasks
  const handleAllTasks = () => {
    setFilterState('all')
  }

  const handleActiveTasks = () => {
    setFilterState('active')
    setFiltered(
      tasks.filter((task) => {
        return !task.completed
      })
    )
  }

  const handleCompletedTasks = () => {
    setFilterState('completed')
    setFiltered(
      tasks.filter((task) => {
        return task.completed
      })
    )
  }

  // Update filtered
  useEffect(() => {
    if (filterState === 'active') {
      setFiltered(
        tasks.filter((task) => {
          return !task.completed
        })
      )
    } else if (filterState === 'completed') {
      setFiltered(
        tasks.filter((task) => {
          return task.completed
        })
      )
    }
  }, [tasks, filterState]);

  return (
    <div className='todo-app-container'>
      <TodoForm
        tasks={tasks}
        setTasks={setTasks}
      />
      <div className='todo-list'>
        <ul className='todo-list__list'>
            {
                filterState === 'all' ?
                tasks.length === 0 ?
                <p className='default-text'>No tasks today!</p> :
                tasks.map((task) => <Todo key={task.id} task={task} setTasks={setTasks} onCompleted={isCompleted} onDeleteTask={deleteTask} />) :
                filterState === 'active' ?
                filtered.length === 0 ?
                <p className='default-text'>No active tasks today!</p> :
                filtered.map((task) => <Todo key={task.id} task={task} setTasks={setTasks} onCompleted={isCompleted} onDeleteTask={deleteTask}  />) :
                filtered.length === 0 ?
                <p className='default-text'>No completed tasks today</p> :
                filtered.map((task) => <Todo key={task.id} task={task} setTasks={setTasks} onCompleted={isCompleted} onDeleteTask={deleteTask} />)
            }
        </ul>
        <div className="todo-list__bottom">
            <span>{tasks.length} items left</span>
            <div className="todo-list__bottom-filter">
                <span className={filterState === 'all' ? 'active' : ''} onClick={handleAllTasks}>All</span>
                <span className={filterState === 'active' ? 'active' : ''} onClick={handleActiveTasks}>Active</span>
                <span className={filterState === 'completed' ? 'active' : ''} onClick={handleCompletedTasks}>Completed</span>
            </div>
            <span onClick={handleClear}>Clear Completed</span>
        </div>
        <p className='tip'>Drag and drop to reorder list</p>
      </div>
    </div>
  );
}

export default App;