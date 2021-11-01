import React from 'react';

export default function Footer(props){
    const {activeTodos, completedTodos} = props.todos;
    const {
        cache, 
        mode,
        changeMode,
        undo,
        redo,
        clearCompleted
    } = props;

    return (
        <div className='footer' >
            <p>{activeTodos.length} {activeTodos.length>1?'items':'item'} left</p>
            <div className='mode-btns'>
                <button className={mode === 'All' ? 'active' : ''} onClick={()=>changeMode('All')}>All</button>
                <button className={mode === 'Active' ? 'active' : ''} onClick={()=>changeMode('Active')}>Active</button>
                <button className={mode === 'Completed' ? 'active' : ''} onClick={()=>changeMode('Completed')}>Completed</button>
                <button
                id='undo-btn'
                className={mode !== 'Active' || activeTodos.length===0?'disabled':''} 
                disabled={mode !== 'Active' || activeTodos.length===0}
                onClick={()=>undo()}>Undo</button>
                <button
                id='redo-btn'
                className={cache.length === 0 ? 'disabled' : ''}
                disabled={cache.length === 0} 
                onClick={()=>redo()}>Redo</button>
            </div>
            {
                // 有已经完成的todo
                completedTodos.length > 0 ? 
                <p onClick={()=>clearCompleted()} id='clear'>Clear completed</p> : ''
            }
        </div>
    )
}