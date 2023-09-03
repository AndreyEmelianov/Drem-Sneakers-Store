import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Drawer from './components/drawer/Drawer';
import Header from './components/header/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context/context';
import Orders from './pages/Orders';

function App() {
	const [sneakersItems, setSneakersItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const [cartResponse, favoritesResponse, sneakersItemsResponse] = await Promise.all([
					axios.get('https://64f1fd3f0e1e60602d24874a.mockapi.io/cart'),
					axios.get('https://64f22c220e1e60602d24d9c0.mockapi.io/favorites'),
					axios.get('https://64f1fd3f0e1e60602d24874a.mockapi.io/sneakersItems'),
				]);

				setIsLoading(false);

				setCartItems(cartResponse.data);
				setFavorites(favoritesResponse.data);
				setSneakersItems(sneakersItemsResponse.data);
			} catch (error) {
				alert('Ошибка при запросе данных');
			}
		}

		fetchData();
	}, []);

	const onAddToCart = async (obj) => {
		try {
			if (cartItems.find((cartItem) => Number(cartItem.id) === Number(obj.id))) {
				setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
				await axios.delete(`https://64f1fd3f0e1e60602d24874a.mockapi.io/cart/${obj.id}`);
			} else {
				const { data } = await axios.post('https://64f1fd3f0e1e60602d24874a.mockapi.io/cart', obj);
				setCartItems((prev) => [...prev, data]);
			}
		} catch (error) {
			alert('Не удалось добавить товар в корзину');
		}
	};

	const onRemoveCartItem = async (id) => {
		try {
			setCartItems((prev) => prev.filter((item) => item.id !== id));
			await axios.delete(`https://64f1fd3f0e1e60602d24874a.mockapi.io/cart/${id}`);
		} catch (error) {
			alert('Ошибка при удалении товара из корзины');
		}
	};

	const onAddToFavorite = async (obj) => {
		try {
			if (favorites.find((favorite) => Number(favorite.id) === Number(obj.id))) {
				await axios.delete(`https://64f22c220e1e60602d24d9c0.mockapi.io/favorites/${obj.id}`);
				setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
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

	const isAddedItemToCart = (id) => {
		return cartItems.some((cartItem) => Number(cartItem.id) === Number(id));
	};

	return (
		<AppContext.Provider
			value={{
				sneakersItems,
				cartItems,
				favorites,
				isAddedItemToCart,
				onAddToFavorite,
				onAddToCart,
				setIsCartOpen,
				setCartItems,
			}}
		>
			<div className="wrapper clear">
				<Drawer
					closeCart={() => setIsCartOpen(false)}
					onRemoveCartItem={onRemoveCartItem}
					opened={isCartOpen}
				/>

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
					<Favorites />
				</Route>
				<Route path="/orders" exact>
					<Orders />
				</Route>
			</div>
		</AppContext.Provider>
	);
}
// favoritesItems = { favorites };
export default App;
