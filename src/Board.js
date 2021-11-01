import React from 'react'
import TodoItem from './TodoItem'

export default function Board(props){
    let showList;
    const {allTodos, activeTodos, completedTodos} = props.todos;
    
    switch(props.mode){
        case 'All':
            showList = allTodos;
            break;
        case 'Active':
            showList = activeTodos;
            break;
        case 'Completed':
            showList = completedTodos;
            break;
        default:
            showList = allTodos;
    }
    
    return (
        <ul className='board' >
            { 
            showList.map((item)=>(
                <TodoItem 
                key={item.id}
                item={item} 
                deleteTodo={props.deleteTodo}
                saveEdit={props.saveEdit}
                completeTodo={props.completeTodo}/>
            )) 
            }
        </ul>
    )
}