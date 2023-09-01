import { useEffect, useState } from 'react';
import axios from 'axios';

import CardItem from './components/cardItem/CardItem';
import Drawer from './components/drawer/Drawer';
import Header from './components/header/Header';

function App() {
	const [sneakersItems, setSneakersItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		axios
			.get('https://64f1fd3f0e1e60602d24874a.mockapi.io/sneakersItems')
			.then((res) => setSneakersItems(res.data));

		axios
			.get('https://64f1fd3f0e1e60602d24874a.mockapi.io/cart')
			.then((res) => setCartItems(res.data));
	}, []);

	const onAddToCart = (obj) => {
		axios.post('https://64f1fd3f0e1e60602d24874a.mockapi.io/cart', obj);

		setCartItems((prev) => [...prev, obj]);
	};

	const onRemoveCartItem = (id) => {
		axios.delete(`https://64f1fd3f0e1e60602d24874a.mockapi.io/cart/${id}`);

		setCartItems((prev) => prev.filter((item) => item.id !== id));
	};

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};

	return (
		<div className="wrapper clear">
			{isCartOpen && (
				<Drawer
					cartItems={cartItems}
					closeCart={() => setIsCartOpen(false)}
					onRemoveCartItem={onRemoveCartItem}
				/>
			)}
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
