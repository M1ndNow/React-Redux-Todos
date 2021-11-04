import { getItemFromLocalStorage, updateLocalStorage } from '../localStorageOperation';
import { ALL } from '../modeTypes';
import {
	ADD_TODO,
	DELETE_TODO,
	SELECT_ALL,
	COMPLETE_TODO,
	UNDO,
	REDO,
	CLEAR_COMPLETED,
	CHANGE_MODE,
	SAVE_EDIT
} from './actionType';

const initalState = {
	todos: getItemFromLocalStorage('todos'),
	undoList: getItemFromLocalStorage('undoList'),
	mode: ALL
};

export const isAllTodosCompleted = (todos) => todos.length > 0 && todos.every((item) => item.completed);

export default function reducer(state = initalState, action) {
	let { type, payload } = action;
	switch (type) {
		// 添加todo
		case ADD_TODO: {
			const todos = [ payload, ...state.todos ];
			updateLocalStorage('todos', todos);
			return {
				...state,
				todos
			};
		}
		// 全选/取消全选
		case SELECT_ALL: {
			let { todos } = state;
			const allCompleted = isAllTodosCompleted(todos);

			todos = todos.map((item) => {
				item.completed = allCompleted ? false : true;
				return item;
			});
			updateLocalStorage('todos', todos);
			return {
				...state,
				todos
			};
		}
		// 点击todo，修改completed状态
		case COMPLETE_TODO: {
			const todos = state.todos.map((item) => {
				if (item.id === payload) {
					item.completed = !item.completed;
				}
				return item;
			});
			updateLocalStorage('todos', todos);
			return {
				...state,
				todos
			};
		}
		// 删除todo
		case DELETE_TODO: {
			const todos = state.todos.filter((item) => item.id !== payload);
			updateLocalStorage('todos', todos);
			return {
				...state,
				todos
			};
		}
		// undo
		case UNDO: {
			const undoItem = state.todos.find((item) => !item.completed);
			const undoList = [ undoItem, ...state.undoList ];
			const todos = state.todos.filter((item) => item.id !== undoItem.id);

			updateLocalStorage('todos', todos);
			updateLocalStorage('undoList', undoList);
			return {
				...state,
				undoList,
				todos
			};
		}
		// redo
		case REDO: {
			const redoItem = state.undoList.shift();
			const todos = [ redoItem, ...state.todos ];
			const undoList = state.undoList.filter((item) => item.id !== redoItem.id);

			updateLocalStorage('todos', todos);
			updateLocalStorage('undoList', undoList);
			return {
				...state,
				todos,
				undoList
			};
		}
		// 清空已完成
		case CLEAR_COMPLETED: {
			const todos = state.todos.filter((item) => !item.completed);
			updateLocalStorage('todos', todos);
			return {
				...state,
				todos
			};
		}
		// 修改mode
		case CHANGE_MODE: {
			return {
				...state,
				mode: payload
			};
		}
		// 保存单行编辑内容
		case SAVE_EDIT: {
			const { id, content } = payload;
			const todos = state.todos.map((item) => {
				if (item.id === id) {
					item.content = content;
				}
				return item;
			});
			updateLocalStorage('todos', todos);

			return {
				...state,
				todos
			};
		}
		default:
			return state;
	}
}
