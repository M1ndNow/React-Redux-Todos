export const updateLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLocalStorage = (key) => {
	if (localStorage.getItem(key) === null) {
		localStorage.setItem(key, '[]');
		return [];
	}
	return JSON.parse(localStorage.getItem(key));
};
