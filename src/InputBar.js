import React,{useState} from 'react';
import {v4 as uuid} from 'uuid';

const InputBar = (props) => {
    let [value, setValue] = useState('');
    let {allTodos, completedTodos} = props.todos;

    // 按下回车键添加todo
    const handlePressReturn = (e) => {
        if(e.charCode === 13 && value !== ''){
            let item = {};
            item.id = uuid();
            item.content = value;
            item.completed = false;
            props.addTodo(item);
            setValue('');
        }
    }
    return (
        <div className='input-bar'>
            <input
                type="checkbox" 
                onChange={()=>props.selectAll()}
                checked={allTodos.length > 0 && allTodos.length === completedTodos.length}/>
            <input 
            onChange={(e)=>setValue(e.target.value)} 
            value={value} 
            placeholder='What needs to be done?'
            onKeyPress={handlePressReturn}/>
        </div>
    )
}

export default InputBar;