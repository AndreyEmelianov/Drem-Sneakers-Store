import { useContext } from 'react';
import CardItem from '../components/cardItem/CardItem';
import AppContext from '../context/context';

const Favorites = () => {
	const { favorites, onAddToFavorite } = useContext(AppContext);

	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>Тут мои закладки</h1>
			</div>

			<div className="d-flex flex-wrap">
				{favorites.map((favoritesItem, index) => (
					<CardItem
						key={index}
						id={favoritesItem.id}
						imageUrl={favoritesItem.imageUrl}
						title={favoritesItem.title}
						price={favoritesItem.price}
						favorited={true}
						onFavorite={onAddToFavorite}
					/>
				))}
			</div>
		</div>
	);
};
export default Favorites;
