import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './InputBar.scss';

export default function InputBar({ addTodo, isAllCompleted, selectAll }) {
	let [ value, setValue ] = useState('');

	// 按下回车键添加todo
	const handlePressReturn = (e) => {
		if (e.charCode === 13 && value !== '') {
			addTodo({
				id: uuid(),
				content: value,
				completed: false
			});
			setValue('');
		}
	};
	return (
		<div className='input-bar'>
			<input type='checkbox' onChange={() => selectAll()} checked={isAllCompleted} />
			<input
				onChange={(e) => setValue(e.target.value)}
				value={value}
				placeholder='What needs to be done?'
				onKeyPress={handlePressReturn}
			/>
		</div>
	);
}
