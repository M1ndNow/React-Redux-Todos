import React from 'react'
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import {
  addTodo,
  deleteTodo,
  selectAll,
  saveEdit,
  clearCompleted,
  undo,
  redo,
  changeMode,
  completeTodo,
  initializeState
} from './redux/actions';
import Board from "./Board";
import Footer from "./Footer";
import InputBar from "./InputBar";
import reducer from './redux/reducer';

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    cache: state.cache,
    mode: state.mode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      addTodo: (item) => {
          dispatch(addTodo(item))
      },
      deleteTodo: (id) => {
          dispatch(deleteTodo(id))
      },
      saveEdit: (id, content) => {
          dispatch(saveEdit(id, content))
      },
      clearCompleted: () => {
          dispatch(clearCompleted())
      },
      undo: () => {
          dispatch(undo())
      },
      redo: () => {
          dispatch(redo())
      },
      completeTodo: (id) => {
          dispatch(completeTodo(id))
      },
      changeMode: (mode) => {
          dispatch(changeMode(mode))
      },
      selectAll: () => {
          dispatch(selectAll())
      }
  }
}

const store = createStore(reducer);
const WrappedInputBar = connect(mapStateToProps, mapDispatchToProps)(InputBar);
const WrappedBoard = connect(mapStateToProps, mapDispatchToProps)(Board);
const WrappedFooter = connect(mapStateToProps, mapDispatchToProps)(Footer);

const App = () => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const cache = JSON.parse(localStorage.getItem('cache'));
    store.dispatch(initializeState(todos, cache))

    return (
      <Provider store={store}>
        <div className="container">
          <h1>todos</h1>
          <WrappedInputBar/>
          <WrappedBoard/>
          <WrappedFooter/>
        </div>
      </Provider>
    );
}

export default App;
