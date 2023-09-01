import CardItem from './components/cardItem/CardItem';
import Drawer from './components/drawer/Drawer';
import Header from './components/header/Header';



function App() {
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

				<div className="d-flex">
					<CardItem />
				</div>
			</div>
		</div>
	);
}

export default App;
