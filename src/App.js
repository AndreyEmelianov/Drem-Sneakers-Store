import { useEffect, useState } from 'react';
import CardItem from './components/cardItem/CardItem';
import Drawer from './components/drawer/Drawer';
import Header from './components/header/Header';

function App() {
	const [sneakersItems, setSneakersItems] = useState([]);

	useEffect(() => {
		fetch('https://64f1fd3f0e1e60602d24874a.mockapi.io/sneakersItems')
			.then((res) => res.json())
			.then((data) => setSneakersItems(data));
	}, []);

	return (
		<div className="wrapper clear">
			<Drawer />
			<Header />
			<div className="content p-40">
				<div className="d-flex align-center justify-between mb-40">
					<h1>Все кроссовки</h1>
					<div className="search-block d-flex">
						<img src="/img/search.svg" alt="иконка поиска" />
						<input type="text" placeholder="Поиск..." />
					</div>
				</div>

				<div className="d-flex flex-wrap">
					{sneakersItems.map((sneakersItem) => (
						<CardItem
							key={sneakersItem.imageUrl}
							imageUrl={sneakersItem.imageUrl}
							title={sneakersItem.title}
							price={sneakersItem.price}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
