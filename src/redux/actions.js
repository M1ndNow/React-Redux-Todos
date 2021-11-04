import {
	ADD_TODO,
	DELETE_TODO,
	CHANGE_MODE,
	COMPLETE_TODO,
	UNDO,
	REDO,
	CLEAR_COMPLETED,
	SAVE_EDIT,
	SELECT_ALL
} from './actionType';

export const addTodo = (item) => ({
	type: ADD_TODO,
	payload: item
});

export const deleteTodo = (id) => ({
	type: DELETE_TODO,
	payload: id
});

export const selectAll = () => ({
	type: SELECT_ALL,
	payload: null
});

export const changeMode = (mode) => ({
	type: CHANGE_MODE,
	payload: mode
});

export const completeTodo = (id) => ({
	type: COMPLETE_TODO,
	payload: id
});

export const undo = () => ({
	type: UNDO,
	payload: null
});

export const redo = () => ({
	type: REDO,
	payload: null
});

export const clearCompleted = () => ({
	type: CLEAR_COMPLETED,
	payload: null
});

export const saveEdit = (id, content) => ({
	type: SAVE_EDIT,
	payload: { id, content }
});
