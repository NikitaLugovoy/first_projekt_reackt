import CardButton from '../CardButton/CardButton';
import'./JournalAddButton.css';

function JournalAddButton({clearForm}) {

	return (
		<CardButton className='journal-add' onClick={clearForm}>
			<svg width="5%" height="5%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
            Новое воспоминание
		</CardButton>
	);
}

export default JournalAddButton;
