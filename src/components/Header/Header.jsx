import SelectUser from '../SelectUser/SelectUser';
import Logo from '../logo/logo';


const logos = ['/logo.svg', '/favicon.svg'];

function Header() {
	console.log('Header');

	return (
		<>
			<Logo image = {logos[0]}/>
			<SelectUser />
		</>
	);
}

export default Header;
