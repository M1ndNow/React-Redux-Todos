import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

if(localStorage.getItem('todos') === null){
  localStorage.setItem('todos', JSON.stringify({
    allTodos:[],
    activeTodos:[],
    completedTodos:[]
  }));
}
if(localStorage.getItem('cache') === null){
  localStorage.setItem('cache', '[]');
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);