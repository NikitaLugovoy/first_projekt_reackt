import { useState,useEffect } from 'react';

export function useLocalStorage (key) {
	const [data, setData] = useState();

	useEffect(() => {

		const resdate = localStorage.getItem(key);

		if (!resdate) {
			setData([]);
			return;
		}
		const res = JSON.parse(resdate);
		if (!Array.isArray(res)) {
			setData([]);
			return;
		}

		return setData(res);
	}, [key]);
        
	const saveData = (newData) => {
		localStorage.setItem(key, JSON.stringify(newData));
		setData(newData);
	};
	
	return [data, saveData];
}