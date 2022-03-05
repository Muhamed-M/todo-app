import { React, useState, useEffect, useRef } from 'react';
import './todoform.css';
import iconSun from '../../assets/icon-sun.svg';
import iconMoon from '../../assets/icon-moon.svg';

const TodoForm = ({ tasks, setTasks }) => {
  const [theme, setTheme] = useState('dark');
  const inputValue = useRef();

  // Get user input
  const handleInput = (event) => {
    if (inputValue.current.value === '') return;
    if (event.key === 'Enter') {
      setTasks([...tasks, {
        id: Math.random(),
        body: inputValue.current.value,
        completed: false
      }])

      inputValue.current.value = null;
    }
  }

  useEffect(() => {
    const prefferedTheme = localStorage.getItem('theme');
    setTheme(prefferedTheme);
  }, []);

  useEffect(() => {
    const changeTheme = () => {
      if (theme === 'light') document.body.classList.add('light-theme');
      else document.body.classList.remove('light-theme');
    }
    changeTheme();

    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className='todo-form'>
      <div className='todo-form__top'>
        <h1 className='todo-form__top-logo'>TODO</h1>
        {
          theme === 'dark' ?
          <img src={iconSun} alt='sun icon' onClick={() => setTheme('light')}/> :
          <img src={iconMoon} alt='moon icon' onClick={() => setTheme('dark')}/>
        }
      </div>
      <input 
        className='todo-form__input'
        type='text'
        placeholder='Create a new todo...'
        ref={inputValue}
        onKeyPress={handleInput}
      />
    </div>
  )
}

export default TodoForm;