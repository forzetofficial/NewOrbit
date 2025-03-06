import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Rocket, User, LogOut } from 'lucide-react';
import styles from "./Header.module.css";

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();

  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  const navigate_profile = () => {
    navigate('/uinfo');
  }

  const navigate_exit = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Rocket size={24} />
        <span>Орбита успеха</span>
      </div>

      <nav className={styles.nav}>
        <NavLink 
          to="/homemain" 
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          Главная
        </NavLink>
        <NavLink 
          to="/courses" 
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          Каталог курсов
        </NavLink>
        <NavLink 
          to="/my-learning" 
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          Моё обучение
        </NavLink>
      </nav>

      <div className={styles.profile}>
        <button 
          className={styles.profileButton}
          onClick={toggleProfileMenu}
        >
          <User size={24} />
        </button>

        {showProfileMenu && (
          <div className={styles.profileMenu}>
            <button className={styles.profileMenuItem} onClick={navigate_profile}>
              <User size={16} className="inline mr-2" />
              Профиль
            </button>
            <button className={styles.profileMenuItem} onClick={navigate_exit}>
              <LogOut size={16} className="inline mr-2" />
              Выход
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;