import CardItem from '../components/cardItem/CardItem';

const Favorites = ({ favoritesItems, onAddToFavorite }) => {
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>Тут мои закладки</h1>
			</div>

			<div className="d-flex flex-wrap">
				{favoritesItems.map((favoritesItem, index) => (
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
