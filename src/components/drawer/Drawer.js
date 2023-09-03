import { useState } from 'react';
import axios from 'axios';

import { useCart } from '../../hooks/useCart';
import Info from '../info/Info';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ closeCart, onRemoveCartItem, opened }) => {
	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const [orderId, setOrderId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { cartItems, setCartItems, totalPrice } = useCart();

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post('https://64f22c220e1e60602d24d9c0.mockapi.io/orders', {
				items: cartItems,
			});

			setOrderId(data.id);
			setIsOrderComplete(true);
			setCartItems([]);

			for (let i = 0; i < cartItems; i++) {
				const item = cartItems[i];
				await axios.delete('https://64f1fd3f0e1e60602d24874a.mockapi.io/cart/' + item.id);
				await delay(1000);
			}
		} catch (error) {
			alert('Ошибка при создании заказа');
		}

		setIsLoading(false);
	};

	return (
		<div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
			<div className={styles.drawer}>
				<h2 className="d-flex justify-between mb-30 ">
					Корзина
					<img
						className="cu-p"
						onClick={closeCart}
						src="/img/btn-remove.svg"
						alt="кнопка закрыть корзину"
					/>
				</h2>

				{cartItems.length > 0 ? (
					<div className="d-flex flex-column flex">
						<div className="items">
							{cartItems.map((cartItem) => (
								<div className="cartItem d-flex align-center mb-20" key={cartItem.id}>
									<div
										style={{ backgroundImage: `url(${cartItem.imageUrl})` }}
										className="cartItemImg"
									></div>

									<div className="mr-20 flex">
										<p className="mb-5">{cartItem.title}</p>
										<b>{cartItem.price} руб.</b>
									</div>
									<img
										className="removeBtn"
										src="/img/btn-remove.svg"
										alt="кнопка удалить"
										onClick={() => onRemoveCartItem(cartItem.id)}
									/>
								</div>
							))}
						</div>
						<div className="cartTotalBlock">
							<ul>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} руб. </b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>{(totalPrice / 100) * 5} руб. </b>
								</li>
							</ul>
							<button disabled={isLoading} className="greenButton" onClick={onClickOrder}>
								Оформить заказ <img src="/img/arrow.svg" alt="иконка стрелочки" />
							</button>
						</div>
					</div>
				) : (
					<Info
						title={isOrderComplete ? 'Заказ успешно оформлен!' : 'Корзина пустая'}
						description={
							isOrderComplete
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'
						}
						image={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
					/>
				)}
			</div>
		</div>
	);
};
export default Drawer;
