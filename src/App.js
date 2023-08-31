function App() {
	return (
		<div className="wrapper clear">
			<header className="d-flex justify-between align-center p-40">
				<div className="d-flex align-center">
					<img width={40} height={40} src="/img/logo.png" alt="Логотип магазина" />
					<div>
						<h3 className="text-uppercase">Drem Sneakers</h3>
						<p>Магазин модных кроссовок</p>
					</div>
				</div>

				<ul className="d-flex">
					<li className="mr-30">
						<img width={18} height={18} src="/img/cart.svg" alt="иконка корзины" />
						<span>1205 руб.</span>
					</li>
					<li>
						<img width={18} height={18} src="/img/user.svg" alt="иконка профиля" />
					</li>
				</ul>
			</header>

			<div className="content p-40">
				<h1>Все кроссовки</h1>
			</div>
		</div>
	);
}

export default App;
