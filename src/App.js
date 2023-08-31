function App() {
	return (
		<div className="wrapper">
			<header>
				<div className="headerLeft">
					<img width={40} height={40} src="/img/logo.png" alt="Логотип магазина" />
					<div className="headerInfo">
						<h3>Drem Sneakers</h3>
						<p>Магазин модных кроссовок</p>
					</div>
				</div>

				<ul className="headerRight">
					<li>
						<img width={18} height={18} src="/img/cart.svg" alt="иконка корзины" />
						<span>1205 руб.</span>
					</li>
					<li>
						<img width={18} height={18} src="/img/user.svg" alt="иконка профиля" />
					</li>
				</ul>
			</header>

			<div className="content">
				<h1>Все кроссовки</h1>
			</div>
		</div>
	);
}

export default App;
