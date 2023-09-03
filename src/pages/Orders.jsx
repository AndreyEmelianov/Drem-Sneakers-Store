import { useEffect, useState } from 'react';
import CardItem from '../components/cardItem/CardItem';
import axios from 'axios';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get('https://64f22c220e1e60602d24d9c0.mockapi.io/orders');
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
				setIsLoading(false);
			} catch (error) {
				alert('Не удалось получить список заказов');
			}
		})();
	}, []);

	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>История заказов</h1>
			</div>

			<div className="d-flex flex-wrap">
				{(isLoading ? [...Array(8)] : orders).map((item, index) => (
					<CardItem key={index} isLoading={isLoading} {...item} />
				))}
			</div>
		</div>
	);
};
export default Orders;
