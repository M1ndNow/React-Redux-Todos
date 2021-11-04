import React from 'react';
import { ACTIVE, ALL, COMPLETED } from '../../modeTypes';
import './Footer.scss';

export default function Footer({
	activeNum,
	completedNum,
	mode,
	isUndoListEmpty,
	undo,
	redo,
	clearCompleted,
	changeMode
}) {
	return (
		<div className='footer'>
			<p>
				{activeNum} {activeNum > 1 ? 'items' : 'item'} left
			</p>
			<div className='mode-btns'>
				<button className={mode === ALL ? 'active' : ''} onClick={() => changeMode(ALL)}>
					All
				</button>
				<button className={mode === ACTIVE ? 'active' : ''} onClick={() => changeMode(ACTIVE)}>
					Active
				</button>
				<button className={mode === COMPLETED ? 'active' : ''} onClick={() => changeMode(COMPLETED)}>
					Completed
				</button>
				<button
					id='undo-btn'
					className={mode !== ACTIVE || activeNum === 0 ? 'disabled' : ''}
					disabled={mode !== ACTIVE || activeNum === 0}
					onClick={() => undo()}
				>
					Undo
				</button>
				<button
					id='redo-btn'
					className={isUndoListEmpty ? 'disabled' : ''}
					disabled={isUndoListEmpty}
					onClick={() => redo()}
				>
					Redo
				</button>
			</div>
			{// 有已经完成的todo
			completedNum > 0 ? (
				<p onClick={() => clearCompleted()} id='clear'>
					Clear completed
				</p>
			) : (
				''
			)}
		</div>
	);
}
