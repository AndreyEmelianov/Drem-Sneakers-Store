import { useState } from 'react';
import styles from './CardItem.module.scss';

const CardItem = ({ imageUrl, title, price }) => {
	const [isAddToCart, setIsAddToCart] = useState(false);

	const onClickAddToCart = () => {
		setIsAddToCart(!isAddToCart);
	};

	return (
		<div className={styles.card}>
			<div className={styles.favorite}>
				<img src="/img/unliked.svg" alt="иконка избранное неактивная" />
			</div>

			<img width={133} height={112} src={imageUrl} alt="кроссовки" />
			<h5>{title}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена:</span>
					<b>{price} руб.</b>
				</div>

				<img
					onClick={onClickAddToCart}
					className={styles.plus}
					src={isAddToCart ? 'img/btn-checked.svg' : '/img/btn-plus.svg'}
					alt="кнопка добавить"
				/>
			</div>
		</div>
	);
};
export default CardItem;
