import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './Board.scss';

export default function Board({ showList, saveEdit, deleteTodo, completeTodo }) {
	return (
		<ul className='board'>
			{showList.map((item) => (
				<TodoItem
					key={item.id}
					item={item}
					deleteTodo={deleteTodo}
					saveEdit={saveEdit}
					completeTodo={completeTodo}
				/>
			))}
		</ul>
	);
}
