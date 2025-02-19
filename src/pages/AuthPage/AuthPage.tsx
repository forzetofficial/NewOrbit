import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from './AuthPage.module.css';
import { useAuthStore } from '../../store/useAuthStore';


const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  width: '300px',
  textAlign: 'center',
};

const EmailModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const { forgotPassword, error, setError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await forgotPassword(email);
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h2>Введите ваш Email</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            value={email} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
            placeholder="Введите ваш email" 
            required 
          />
          <button type="submit">Отправить</button>
          <button type="button" onClick={onClose}>Закрыть</button>
        </form>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>Неправильный email</div>}
      </div>
    </div>
  );
};

export function AuthPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { signIn, error } = useAuthStore();

  const click = () => {
    navigate("/");
  };
  const clickreg = () => {
    navigate("/registration");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChangep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangee = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSignIn = async () => {
    await signIn(email, password, navigate);
  };

  return (
    <div className={styles.sky}>
      <div className={styles.stars}></div>
      <div className={styles.stars1}></div>
      <div className={styles.stars2}></div>
      <div className={styles.shootingstars}></div>
      <div className={styles.auth}>
        <div className={styles.Headbox}>
          <header className={styles.HEAD}>ВХОД В ПРОФИЛЬ</header>
          <h5 className={styles.Logintext}>Логин</h5>
          <input
            type="email"
            value={email}
            onChange={handleChangee}
            placeholder="Введите e-mail"
            style={{
              width: '75%',
              padding: '10px',
              borderRadius: '20px',
              fontSize: '16px',
              margin: '0 auto',
              display: 'block',
            }}
          />
          <h5 className={styles.Passwordtext}>Пароль</h5>
          <input
            type="password"
            value={password}
            onChange={handleChangep}
            placeholder="Введите пароль"
            style={{
              width: '75%',
              padding: '10px',
              borderRadius: '20px',
              fontSize: '16px',
              margin: '0 auto',
              display: 'block',
            }}
          />
          <Button
            onClick={toggleModal}
            sx={{
              color: "white",
              fontSize: 10,
              top: 15,
              left: 57,
              fontFamily: "Montserrat",
              opacity: 1,
            }}
          >
            Забыли пароль?
          </Button>
          <EmailModal isOpen={isModalOpen} onClose={toggleModal} />
          <div className={styles.Button}>
            <button className={styles.buttonAuth} onClick={handleSignIn}>
              Войти
            </button>
            {error && <div className={styles.errormessage}>Неправильный логин или пароль</div>}
          </div>
          <div className={styles.Button}>
            <button className={styles.buttonReg} onClick={clickreg}>
              Зарегистрироваться
            </button>
          </div>
          <Button
            onClick={click}
            color='inherit'
            sx={{
              color: "white",
              fontSize: 10,
              top: 50,
              left: 155,
              opacity: 1,
            }}
          >
            Назад на главную страницу
          </Button>
        </div>
      </div>
    </div>
  );
}