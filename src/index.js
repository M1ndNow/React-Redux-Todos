import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import reducer from './redux/reducer';
import {
	addTodo,
	deleteTodo,
	selectAll,
	saveEdit,
	clearCompleted,
	undo,
	redo,
	changeMode,
	completeTodo
} from './redux/actions';
import './index.css';

const mapStateToProps = (state) => {
	return {
		todos: state.todos,
		undoList: state.undoList,
		mode: state.mode
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addTodo: (item) => {
			dispatch(addTodo(item));
		},
		deleteTodo: (id) => {
			dispatch(deleteTodo(id));
		},
		saveEdit: (id, content) => {
			dispatch(saveEdit(id, content));
		},
		clearCompleted: () => {
			dispatch(clearCompleted());
		},
		undo: () => {
			dispatch(undo());
		},
		redo: () => {
			dispatch(redo());
		},
		completeTodo: (id) => {
			dispatch(completeTodo(id));
		},
		changeMode: (mode) => {
			dispatch(changeMode(mode));
		},
		selectAll: () => {
			dispatch(selectAll());
		}
	};
};

const store = createStore(reducer);
const WrappedApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
	<Provider store={store}>
		<WrappedApp />
	</Provider>,
	document.getElementById('root')
);
