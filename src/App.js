import { useEffect, useState } from 'react';
import CardItem from './components/cardItem/CardItem';
import Drawer from './components/drawer/Drawer';
import Header from './components/header/Header';

function App() {
	const [sneakersItems, setSneakersItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		fetch('https://64f1fd3f0e1e60602d24874a.mockapi.io/sneakersItems')
			.then((res) => res.json())
			.then((data) => setSneakersItems(data));
	}, []);

	const onAddToCart = (obj) => {
		setCartItems((prev) => [...prev, obj]);
	};

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};

	return (
		<div className="wrapper clear">
			{isCartOpen && <Drawer cartItems={cartItems} closeCart={() => setIsCartOpen(false)} />}
			<Header openCart={() => setIsCartOpen(true)} />
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
						.map((filteredSneakersItem, index) => (
							<CardItem
								key={index}
								imageUrl={filteredSneakersItem.imageUrl}
								title={filteredSneakersItem.title}
								price={filteredSneakersItem.price}
								onPlus={(obj) => onAddToCart(obj)}
							/>
						))}
				</div>
			</div>
		</div>
	);
}

export default App;
