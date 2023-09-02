import { useContext, useState } from 'react';
import styles from './CardItem.module.scss';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context/context';

const CardItem = ({
	id,
	imageUrl,
	title,
	price,
	onPlus,
	onFavorite,
	favorited = false,
	isLoading = false,
}) => {
	// const [isAddToCart, setIsAddToCart] = useState(isAddedToCart);
	const [isFavorite, setIsFavorite] = useState(favorited);

	const { isAddedItemToCart } = useContext(AppContext);

	const onClickAddToCart = () => {
		onPlus({ title, price, imageUrl, id });
		// setIsAddToCart(!isAddToCart);
	};

	const onClickFavorite = () => {
		onFavorite({ title, price, imageUrl, id });
		setIsFavorite(!isFavorite);
	};

	return (
		<div className={styles.card}>
			{isLoading ? (
				<ContentLoader
					speed={2}
					width={165}
					height={250}
					viewBox="0 0 155 265"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
					<rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
					<rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
					<rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
					<rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
				</ContentLoader>
			) : (
				<>
					<div className={styles.favorite} onClick={onClickFavorite}>
						<img
							src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'}
							alt="иконка избранное неактивная"
						/>
					</div>
					<img width="100%" height={135} src={imageUrl} alt="кроссовки" />
					<h5>{title}</h5>

					<div className="d-flex justify-between align-center">
						<div className="d-flex flex-column">
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						<img
							onClick={onClickAddToCart}
							className={styles.plus}
							src={isAddedItemToCart(id) ? 'img/btn-checked.svg' : '/img/btn-plus.svg'}
							alt="кнопка добавить"
						/>
					</div>
				</>
			)}
		</div>
	);
};
export default CardItem;
