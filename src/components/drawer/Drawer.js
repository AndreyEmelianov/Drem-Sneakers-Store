const Drawer = ({ closeCart, cartItems = [], onRemoveCartItem }) => {
	return (
		<div className="overlay">
			<div className="drawer">
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
									<b>21 500 руб. </b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>1075 руб. </b>
								</li>
							</ul>
							<button className="greenButton">
								Оформить заказ <img src="/img/arrow.svg" alt="иконка стрелочки" />
							</button>
						</div>
					</div>
				) : (
					<div className="cartEmpty d-flex align-center justify-center flex-column flex">
						<img
							className="mb-20"
							width={120}
							height={120}
							src="/img/empty-cart.jpg"
							alt="корзина пуста"
						/>
						<h2>Корзина пустая</h2>
						<p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
						<button onClick={closeCart} className="greenButton">
							<img src="/img/arrow.svg" alt="иконка стрелочки назад" />
							Вернуться назад
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
export default Drawer;
