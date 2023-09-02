import CardItem from '../components/cardItem/CardItem';

const Home = ({
	cartItems,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	sneakersItems,
	onAddToCart,
	onAddToFavorite,
}) => {
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>{searchValue ? `Поиск по запросу: ${searchValue} ` : 'Все кроссовки'}</h1>
				<div className="search-block d-flex">
					<img src="/img/search.svg" alt="иконка поиска" />
					{searchValue && (
						<img
							onClick={() => setSearchValue('')}
							className="clear cu-p"
							src="/img/btn-remove.svg"
							alt="кнопка удалить"
						/>
					)}

					<input
						value={searchValue}
						onChange={onChangeSearchInput}
						type="text"
						placeholder="Поиск..."
					/>
				</div>
			</div>

			<div className="d-flex flex-wrap">
				{sneakersItems
					.filter((sneakersItem) =>
						sneakersItem.title.toLowerCase().includes(searchValue.toLowerCase())
					)
					.map((filteredSneakersItem) => (
						<CardItem
							key={filteredSneakersItem.id}
							id={filteredSneakersItem.id}
							imageUrl={filteredSneakersItem.imageUrl}
							title={filteredSneakersItem.title}
							price={filteredSneakersItem.price}
							onPlus={(obj) => onAddToCart(obj)}
							onFavorite={(obj) => onAddToFavorite(obj)}
							isAddedToCart={cartItems.some(
								(cartItem) => Number(cartItem.id) === Number(filteredSneakersItem.id)
							)}
						/>
					))}
			</div>
		</div>
	);
};
export default Home;
