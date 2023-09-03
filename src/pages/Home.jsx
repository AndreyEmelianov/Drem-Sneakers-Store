import CardItem from '../components/cardItem/CardItem';

const Home = ({
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	sneakersItems,
	onAddToCart,
	onAddToFavorite,
	isLoading,
}) => {
	const renderSneakersItems = () => {
		const filteredItems = sneakersItems.filter((sneakersItem) =>
			sneakersItem.title.toLowerCase().includes(searchValue.toLowerCase())
		);

		return (isLoading ? [...Array(12)] : filteredItems).map((filteredSneakersItem, index) => (
			<CardItem
				key={index}
				onPlus={(obj) => onAddToCart(obj)}
				onFavorite={(obj) => onAddToFavorite(obj)}
				isLoading={isLoading}
				{...filteredSneakersItem}
			/>
		));
	};

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

			<div className="d-flex flex-wrap">{renderSneakersItems()}</div>
		</div>
	);
};
export default Home;
