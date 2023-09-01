import styles from './CardItem.module.scss';

const CardItem = () => {
	return (
		<div className={styles.card}>
			<div className={styles.favorite}>
				<img src="/img/unliked.svg" alt="иконка избранное неактивная" />
			</div>

			<img width={133} height={112} src="/img/sneakers/1.jpg" alt="кроссовки" />
			<h5>Мужские кроссовки Nike Blazer Mid Suede</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена:</span>
					<b>12 999 руб.</b>
				</div>

				<img src="/img/btn-plus.svg" alt="кнопка добавить" className={styles.plus} />
			</div>
		</div>
	);
};
export default CardItem;
