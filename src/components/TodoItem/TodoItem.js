import React, { useState } from 'react';
import './TodoItem.scss';

const TodoItem = (props) => {
	const [ value, setValue ] = useState('');
	let item = props.item;
	const [ editStyle, setEditStyle ] = useState({ display: 'none' });
	const [ viewStyle, setViewStyle ] = useState({ display: 'flex' });
	const [ delBtnStyle, setDelBtnStyle ] = useState({ display: 'none' });
	const { completeTodo, deleteTodo } = props;

	// 双击进行编辑
	const handleDoubleClick = () => {
		setValue(item.content);
		setEditStyle({
			display: 'block'
		});
		setViewStyle({
			display: 'none'
		});
		setTimeout(() => document.getElementById(item.id).focus(), 0);
	};

	// 编辑框失去焦点
	const handleBlur = () => {
		setViewStyle({
			display: 'flex'
		});
		setEditStyle({
			display: 'none'
		});
		props.saveEdit(item.id, value);
	};

	// 显示删除按钮
	const showDelBtn = () => {
		setDelBtnStyle({
			display: 'block'
		});
	};

	// 隐藏删除按钮
	const hideDelBtn = () => {
		setDelBtnStyle({
			display: 'none'
		});
	};

	let labelStyle = {
		textDecoration: !item.completed ? 'none' : 'line-through',
		display: 'inline-block'
	};

	return (
		<li>
			<div className='todo-item' style={viewStyle} onMouseEnter={showDelBtn} onMouseLeave={hideDelBtn}>
				<input type='checkbox' checked={item.completed} onChange={() => completeTodo(item.id)} />
				<label style={labelStyle} onDoubleClick={handleDoubleClick}>
					{item.content}
				</label>
				<div id='delete-btn' style={delBtnStyle} onClick={() => deleteTodo(item.id)}>
					&#735;
				</div>
			</div>
			<input
				id={item.id}
				style={editStyle}
				value={value}
				onBlur={handleBlur}
				onChange={(e) => setValue(e.target.value)}
			/>
		</li>
	);
};

export default TodoItem;
