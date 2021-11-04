import React from 'react';
import Board from '../Board/Board';
import Footer from '../Footer/Footer';
import InputBar from '../InputBar/InputBar';
import { ACTIVE, ALL, COMPLETED } from '../../modeTypes';
import { isAllTodosCompleted } from '../../redux/reducer';
import './App.scss';

export default function App({
	addTodo,
	deleteTodo,
	selectAll,
	saveEdit,
	clearCompleted,
	undo,
	redo,
	changeMode,
	completeTodo,
	todos,
	undoList,
	mode
}) {
	let activeTodos = todos.filter((item) => !item.completed);
	let completedTodos = todos.filter((item) => item.completed);
	let showList;

	switch (mode) {
		case ALL:
			showList = todos;
			break;
		case ACTIVE:
			showList = activeTodos;
			break;
		case COMPLETED:
			showList = completedTodos;
			break;
		default:
			showList = todos;
	}
	return (
		<div className='container'>
			<h1>todos</h1>
			<InputBar addTodo={addTodo} isAllCompleted={isAllTodosCompleted(todos)} selectAll={selectAll} />
			<Board showList={showList} saveEdit={saveEdit} deleteTodo={deleteTodo} completeTodo={completeTodo} />
			<Footer
				activeNum={activeTodos.length}
				completedNum={completedTodos.length}
				mode={mode}
				isUndoListEmpty={undoList.length === 0}
				undo={undo}
				redo={redo}
				clearCompleted={clearCompleted}
				changeMode={changeMode}
			/>
		</div>
	);
}
