import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

export function HomePage() {
	const navigate = useNavigate();

	const handleButtonClick = () => {
		navigate('/auth');
	};
	const napr = () => {
		navigate('/directions');
	};
	const edu = () => {
		navigate('/education');
	};
	const ogeege = () => {
		navigate('/preparation');
	};

	return (
			<div className={styles.square}>
				<div className={styles.back}>
			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
  			<div className={styles.star}></div>
		</div>
				<header className={styles.Heading}>
						<ul className={styles.list}>
							<li>
								<Button
									onClick={napr}
									color='inherit'
									sx={{
										fontSize: 12,
										top: -7,
									}}
								>
									Направления
								</Button>
							</li>
							<li className={styles.separator}>|</li>
							<li>
								<Button
									onClick={edu}
									color='inherit'
									sx={{
										fontSize: 12,
										top: -7,
									}}
								>
									Обучение
								</Button>
							</li>
							<li className={styles.separator}>|</li>
							<li>
								<Button
									onClick={ogeege}
									color='inherit'
									sx={{
										fontSize: 12,
										top: -7,
									}}
								>
									Подготовка к Огэ\Егэ
								</Button>
							</li>
						</ul>
				</header>
				<div className={styles.All}>
				<div className={styles.Inbox}>
					<ul>
						<li className={styles.orb}>Орбита</li>
						<li className={styles.ysp}>успеха</li>
						<li className={styles.n}>стань капитаном своей судьбы</li>
						<li className={styles.n}>и создай свою историю</li>
						<div className={styles.Inbox2}>
							<hr></hr>
							<h4 className={styles.Opsis}>
								Платформа предлагает все необходимое для развития молодого
								онлайн-образовательного предприятия. Все инструменты для
								маркетинга, продаж объединены в одном месте.
							</h4>
						</div>
							<button className={styles.buttonAu} onClick={handleButtonClick}>
								Попробовать
							</button>
					</ul>
				</div>
				<div className={styles.rightSection}>
					<div className={styles.fotobox}>
					<img src="https://cdn.monetnik.ru/storage/market-lot/91/27/91/11444_big.jpg" alt="Orbita Success" />
					<img src="https://cdn.culture.ru/images/80f73545-f5ef-5f7a-a98e-a86ddd8918e3" alt="Orbita Success" />
					<img src="https://cdn.culture.ru/images/9e05305f-3301-58e5-91ec-8b4e899299f7" alt="Orbita Success" />
					<img src="https://cdn.culture.ru/images/1b4f9ad5-748c-5417-bfc6-2271562cacf4" alt="Orbita Success" />
					</div>
    				<p className={styles.quote}>
      				"Успех — это не конечная точка, а только начало путешествия."
    				</p>
  				</div>
				</div>
			</div>
	);
}
