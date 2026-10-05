import { useContext, useEffect, useReducer, useRef } from 'react';
import Button from '../Button/Button';
import styles from './JoutnalForm.module.css';
import cn from 'classname';
import {formReducer, INITIAL_STATE} from './JournalForm.state';
import Input from '../JournalInput/Inputs';
import { UserContext } from '../../context/user.context.jsx';
	

function JoutnalForm({ onSubmit, data, onDelete }) {


	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const {userId} = useContext(UserContext);

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();			
			break;
		}
	};

	useEffect(() => {
		if(!data){
			dispatchForm({ type: 'CLEAR'});
			dispatchForm({type:'SET_VALUE', payload:{ userId }});
		}
		dispatchForm({type:'SET_VALUE', payload:{ ... data }});
	},[data]);

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.post || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	},[isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit){
			onSubmit(values);
			dispatchForm({ type: 'CLEAR'});
			dispatchForm({type:'SET_VALUE', payload:{ userId }});
		}
	},[isFormReadyToSubmit, values, onSubmit, userId]);

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({type:'SUBMIT'});
		
	};

	useEffect(() => {
		dispatchForm({type:'SET_VALUE', payload:{ userId }});
	}, [userId]);

	const onChange = (e) => {
		dispatchForm({type:'SET_VALUE', payload:{ [e.target.name]: e.target.value}});
	};

	const deleteJournalItem = () => {
		onDelete(data.id);
		
		dispatchForm({ type: 'CLEAR'});
		dispatchForm({type:'SET_VALUE', payload:{ userId }});
	};
    
	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			
			<div className={styles['form-row']}>
				<Input appearence='title' type='text' onChange={onChange} ref={titleRef} value={values.title} name='title' isValid={isValid.title} />
				{data?.id && <button className={styles['delete']} type='button' onClick={deleteJournalItem}>
					<img src='/delete.svg' alt='Иконка удаления'/>
				</button>}
			</div>
			<div className={styles['form-row']}>
				<label for="date" className={styles['form-label']}> 
					<img src='/calendar.svg' alt='Иконка календаря'/>
					<span>Дата</span> 
				</label>
				<Input type='date' onChange={onChange} ref={dateRef} value={values.date ? new Date(values.date).toISOString().slice(0,10) : ''} name='date' isValid={isValid.date} id='date' />
			</div>
			<div className={styles['form-row']}>
				<label for="tag" className={styles['form-label']}> 
					<img src='/folder.svg' alt='Иконка папки'/>
					<span>Метки</span> 
				</label>
				<Input type='text' onChange={onChange} value={values.tag} id='tag' name='tag' />	
			</div>
			<textarea name='post' onChange={onChange} ref={postRef} value={values.post} id='' cols='30' rows='10' className={cn(styles['input'],{
				[styles['invalid']] : !isValid.post
			})}></textarea>
			<Button >Сохранить</Button>
		</form>
	);
}

export default JoutnalForm;
