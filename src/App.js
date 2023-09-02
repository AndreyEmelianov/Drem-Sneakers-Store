import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Drawer from './components/drawer/Drawer';
import Header from './components/header/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
	const [sneakersItems, setSneakersItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		axios
			.get('https://64f1fd3f0e1e60602d24874a.mockapi.io/sneakersItems')
			.then((res) => setSneakersItems(res.data));

		axios
			.get('https://64f1fd3f0e1e60602d24874a.mockapi.io/cart')
			.then((res) => setCartItems(res.data));
		axios
			.get('https://64f22c220e1e60602d24d9c0.mockapi.io/favorites')
			.then((res) => setFavorites(res.data));
	}, []);

	const onAddToCart = async (obj) => {
		if (cartItems.find((cartItem) => cartItem.id === obj.id)) {
			return;
		} else {
			const { data } = await axios.post('https://64f1fd3f0e1e60602d24874a.mockapi.io/cart', obj);

			setCartItems((prev) => [...prev, data]);
		}
	};

	const onRemoveCartItem = (id) => {
		axios.delete(`https://64f1fd3f0e1e60602d24874a.mockapi.io/cart/${id}`);

		setCartItems((prev) => prev.filter((item) => item.id !== id));
	};

	const onAddToFavorite = async (obj) => {
		if (favorites.find((favorite) => favorite.id === obj.id)) {
			axios.delete(`https://64f22c220e1e60602d24d9c0.mockapi.io/favorites/${obj.id}`);
			setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
		} else {
			const { data } = await axios.post(
				`https://64f22c220e1e60602d24d9c0.mockapi.io/favorites`,
				obj
			);

			setFavorites((prev) => [...prev, data]);
		}
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

			<Route path="/" exact>
				<Home
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					onChangeSearchInput={onChangeSearchInput}
					sneakersItems={sneakersItems}
					onAddToCart={onAddToCart}
					onAddToFavorite={onAddToFavorite}
				/>
			</Route>
			<Route path="/favorites" exact>
				<Favorites favoritesItems={favorites} onAddToFavorite={onAddToFavorite} />
			</Route>
		</div>
	);
}

export default App;
