import { useContext } from 'react';
import AppContext from '../../context/context';

const Info = ({ image, title, description }) => {
	const { setIsCartOpen } = useContext(AppContext);

	return (
		<div className="cartEmpty d-flex align-center justify-center flex-column flex">
			<img className="mb-20" width={120} src={image} alt="корзина пуста" />
			<h2>{title}</h2>
			<p className="opacity-6">{description}</p>
			<button onClick={() => setIsCartOpen(false)} className="greenButton">
				<img src="/img/arrow.svg" alt="иконка стрелочки назад" />
				Вернуться назад
			</button>
		</div>
	);
};
export default Info;
