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
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const cartResponse = await axios.get('https://64f1fd3f0e1e60602d24874a.mockapi.io/cart');

			const favoritesResponse = await axios.get(
				'https://64f22c220e1e60602d24d9c0.mockapi.io/favorites'
			);

			const sneakersItemsResponse = await axios.get(
				'https://64f1fd3f0e1e60602d24874a.mockapi.io/sneakersItems'
			);

			setIsLoading(false);

			setCartItems(cartResponse.data);
			setFavorites(favoritesResponse.data);
			setSneakersItems(sneakersItemsResponse.data);
		}

		fetchData();
	}, []);

	const onAddToCart = async (obj) => {
		try {
			if (cartItems.find((cartItem) => Number(cartItem.id) === Number(obj.id))) {
				axios.delete(`https://64f1fd3f0e1e60602d24874a.mockapi.io/cart/${obj.id}`);
				setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
			} else {
				const { data } = await axios.post('https://64f1fd3f0e1e60602d24874a.mockapi.io/cart', obj);

				setCartItems((prev) => [...prev, data]);
			}
		} catch (error) {
			alert('Не удалось добавить товар в корзину');
		}
	};

	const onRemoveCartItem = (id) => {
		axios.delete(`https://64f1fd3f0e1e60602d24874a.mockapi.io/cart/${id}`);

		setCartItems((prev) => prev.filter((item) => item.id !== id));
	};

	const onAddToFavorite = async (obj) => {
		try {
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
		} catch (error) {
			alert('Не удалось добавить в избранное');
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
					sneakersItems={sneakersItems}
					cartItems={cartItems}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					onChangeSearchInput={onChangeSearchInput}
					onAddToCart={onAddToCart}
					onAddToFavorite={onAddToFavorite}
					isLoading={isLoading}
				/>
			</Route>
			<Route path="/favorites" exact>
				<Favorites favoritesItems={favorites} onAddToFavorite={onAddToFavorite} />
			</Route>
		</div>
	);
}

export default App;
