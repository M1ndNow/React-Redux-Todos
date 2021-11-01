import { 
    ADD_TODO, 
    DELETE_TODO, 
    SELECT_ALL,
    INITIALIZE_STATE,
    COMPLETE_TODO,
    UNDO,
    REDO,
    CLEAR_COMPLETED,
    CHANGE_MODE,
    SAVE_EDIT
} from './actionType';

const initalState = {
    todos: {
        allTodos: [],
        activeTodos: [],
        completedTodos: []
    },
    cache: [],
    mode: 'All'
}

const reducer = (state = initalState, action) => {
    let {type, payload} = action;
    switch(type){
        // 添加todo
        case ADD_TODO:{
            let {allTodos, activeTodos} = state.todos;
            allTodos.unshift(payload);
            activeTodos.unshift(payload);
            let todos = {
                ...state.todos,
                allTodos: allTodos,
                activeTodos: activeTodos
            }
            
            localStorage.setItem('todos', JSON.stringify(todos));
            return {
                ...state,
                todos
            };
        }
        // 全选/取消全选
        case SELECT_ALL:{
            let {allTodos, completedTodos} = state.todos;
            let todos;
            // 全部修改成未完成
            if(allTodos.length === completedTodos.length){
                allTodos = allTodos.map(item => {
                    item.completed = false;
                    return item;
            })
            todos = {
                allTodos,
                activeTodos: allTodos,
                completedTodos: []
            };
            localStorage.setItem('todos', JSON.stringify(todos));
            // 全部修改为已完成
            }else{
                allTodos = allTodos.map(item => {
                    item.completed = true;
                    return item;
                })
                todos = {
                    allTodos,
                    activeTodos: [],
                    completedTodos: allTodos
                };
                localStorage.setItem('todos', JSON.stringify(todos));
            }
            return {
                ...state,
                todos
            } 
        }
        // 初始化state
        case INITIALIZE_STATE: {
            return {
                ...state,
                mode: 'All',
                todos: {...payload.todos},
                cache: payload.cache
            }
        }
        // 点击todo，修改completed状态
        case COMPLETE_TODO: {
            let {allTodos, activeTodos, completedTodos} = state.todos;

            allTodos = allTodos.map(item => {
                if(item.id === payload){
                    item.completed = !item.completed;
                }
                return item;
            })

            activeTodos = allTodos.filter(item => {
                return !item.completed;
            })

            completedTodos = allTodos.filter(item => {
                return item.completed;
            })
            let todos = {
                allTodos,
                activeTodos,
                completedTodos
            }
            localStorage.setItem('todos', JSON.stringify(todos));
            return {
                ...state,
                todos
            }
        }
        // 删除todo
        case DELETE_TODO:{
            let {allTodos, activeTodos, completedTodos} = state.todos;
            let {cache} = state;
            allTodos = allTodos.filter(item => item.id !== payload);
            activeTodos = activeTodos.filter(item => item.id !== payload);
            completedTodos = completedTodos.filter(item => item.id !== payload);
            cache = cache.filter(item => item.id !== payload);
            let todos = {
                allTodos,
                activeTodos,
                completedTodos
            }
            localStorage.setItem('todos', JSON.stringify(todos));
            localStorage.setItem('cache', JSON.stringify(cache));
            return {
                ...state,
                todos,
                cache
            }
        }
        // undo
        case UNDO:{
            let {allTodos, activeTodos, completedTodos} = state.todos;
            let {cache} = state;
            let undoItem = activeTodos.shift();
            allTodos = allTodos.filter(item => item.id !== undoItem.id);
            cache.unshift(undoItem);
            let todos = {
                allTodos,
                activeTodos,
                completedTodos
            }
            localStorage.setItem('todos', JSON.stringify(todos));
            localStorage.setItem('cache', JSON.stringify(cache));
            return {
                ...state,
                todos,
                cache
            }
        }
        // redo
        case REDO:{
            let {allTodos, activeTodos, completedTodos} = state.todos;
            let {cache} = state;
            let redoItem = cache.shift();
            activeTodos.unshift(redoItem);
            allTodos.unshift(redoItem);
            let todos = {
                allTodos,
                activeTodos,
                completedTodos
            }
            localStorage.setItem('todos', JSON.stringify(todos));
            localStorage.setItem('cache', JSON.stringify(cache));
            return {
                ...state,
                todos,
                cache
            }
        }
        // 清空已完成
        case CLEAR_COMPLETED:{
            let {allTodos, activeTodos} = state.todos;

            allTodos = allTodos.filter(item => {
                return item.completed === false
            })

            let todos = {
                allTodos,
                activeTodos,
                completedTodos: []
            }

            localStorage.setItem('todos', JSON.stringify(todos));

            return {
                ...state,
                todos
            }
        }
        // 修改mode
        case CHANGE_MODE:{
            return {
                ...state,
                mode: payload
            }
        }
        // 保存单行编辑内容
        case SAVE_EDIT:{
            let {allTodos, activeTodos, completedTodos} = state.todos;
            allTodos = allTodos.map(item => {
                if(item.id === payload.id){
                    item.content = payload.content;
                }
                return item;
            })
            activeTodos = activeTodos.map(item => {
                if(item.id === payload.id){
                    item.content = payload.content;
                }
                return item;
            })
            completedTodos = completedTodos.map(item => {
                if(item.id === payload.id){
                    item.content = payload.content;
                }
                return item;
            })
            let todos = {
                allTodos,
                activeTodos,
                completedTodos
            }
            localStorage.setItem('todos', JSON.stringify(todos));
            return {
                ...state,
                todos
            }
        }
        default:
            return state;
    }
}

export default reducer;