import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const Header = ({ openCart }) => {
	const { totalPrice } = useCart();

	return (
		<header className="d-flex justify-between align-center p-40">
			<Link to="/">
				<div className="d-flex align-center">
					<img width={40} height={40} src="/img/logo.png" alt="Логотип магазина" />

					<div>
						<h3 className="text-uppercase">Drem Sneakers</h3>
						<p className="opacity-5">Магазин модных кроссовок</p>
					</div>
				</div>
			</Link>

			<ul className="d-flex">
				<li className="mr-30 cu-p" onClick={openCart}>
					<img width={18} height={18} src="/img/cart.svg" alt="иконка корзины" />
					<span>{totalPrice} руб.</span>
				</li>
				<li className="mr-20 cu-p">
					<Link to="/favorites">
						<img width={18} height={18} src="/img/heart.svg" alt="иконка избранное" />
					</Link>
				</li>
				<li>
					<img width={18} height={18} src="/img/user.svg" alt="иконка профиля" />
				</li>
			</ul>
		</header>
	);
};
export default Header;
