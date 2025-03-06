import React, { useState } from 'react';
import { User, ArrowLeft, Camera, Book, Trophy, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import { useEffect } from "react";


import axios from "axios";

import { Button } from "@mui/material";

import { UserId } from "../../types";

import { useUserStore } from "../../store/useUserStore";
import { useAuthStore } from "../../store/useAuthStore";

interface UserData {
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  phone: string;
  email: string;
  photoUrl: string;
}

interface CourseProgress {
  id: number;
  title: string;
  progress: number;
  image: string;
}

export const Profile = () => {
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.get);
  const userId = localStorage.getItem("userId") as UserId;
  const emailUser = useAuthStore((state) => state.email);

  const [elem_firstname, Set_elem_firstname] = useState("No elem");
  const [elem_middlename, Set_elem_middlename] = useState("No elem");
  const [elem_lastname, Set_elem_lastname] = useState("No elem");
  const [elem_gender, Set_elem_gender] = useState("м");
  const [elem_phone, Set_elem_phone] = useState("No elem");
  const [elem_email, Set_elem_email] = useState("No elem");

  const [userData, setUserData] = useState<UserData>({
    firstName: elem_firstname,
    lastName: elem_middlename,
    middleName: elem_lastname,
    gender: elem_gender,
    phone: elem_phone,
    email: elem_email,
    photoUrl: 'https://i.ytimg.com/vi/R9rxigsBypI/maxresdefault.jpg'
  });

  useEffect(() => {
  getUser(userId);
  if (user.firstname !== '') Set_elem_firstname(user.firstname);
  if (typeof(user.middlename) !== "undefined") Set_elem_middlename(user.middlename);
  if (typeof(user.lastname) !== "undefined") Set_elem_lastname(user.lastname);
  if (typeof(user.gender) !== "undefined") Set_elem_gender(user.gender);
  if (typeof(user.phone) !== "undefined") Set_elem_phone(user.phone);
  if (typeof(emailUser) !== "undefined") Set_elem_email(emailUser); 
  }, [userId, getUser, user, emailUser]);

  useEffect(() => {
    setUserData({
      firstName: elem_firstname,
      lastName: elem_lastname, 
      middleName: elem_middlename, 
      gender: elem_gender,
      phone: elem_phone,
      email: elem_email,
      photoUrl: 'https://i.ytimg.com/vi/R9rxigsBypI/maxresdefault.jpg'
    });
  }, [elem_firstname, elem_middlename, elem_lastname, elem_gender, elem_phone, elem_email]);


  const stats = [
    { icon: <Book size={32} />, title: 'Активные курсы', value: '3' },
    { icon: <Trophy size={32} />, title: 'Завершено курсов', value: '5' },
    { icon: <Clock size={32} />, title: 'Часов обучения', value: '47' },
  ];

  const inProgressCourses: CourseProgress[] = [
    {
      id: 1,
      title: 'JavaScript Основы',
      progress: 75,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'React для начинающих',
      progress: 45,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'TypeScript продвинутый',
      progress: 30,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=80'
    },
  ];

  const handleInputChange = (field: keyof UserData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const { updateInfo, error } = useUserStore();

  const handleSave = async () => {
    await updateInfo(userId, userData.firstName, userData.gender, userData.photoUrl, userData.lastName, userData.middleName, userData.phone);
  };

  const handlePhotoChange = () => {
    alert('Функция изменения фото будет доступна позже');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span>Орбита успеха</span>
        </div>
        <div className={styles.headerTitle}>
          Профиль
        </div>
        <div className={styles.userInfo}>
          <User size={24} />
          <span>{userData.firstName} {userData.lastName}</span>
          <span className={styles.phone}>{userData.phone}</span>
          <button 
            className={styles.backButton}
            onClick={() => navigate('/homemain')}
          >
            <ArrowLeft size={24} />
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <div className={styles.photoSection}>
            <div className={styles.photoWrapper}>
              <img 
                src={userData.photoUrl} 
                alt="Profile" 
                className={styles.photo}
              />
            </div>
            <div className={styles.photoButtons}>
              <button 
                className={styles.button}
                onClick={handlePhotoChange}
              >
                <Camera size={20} />
                Изменить фото
              </button>
              <button 
                className={`${styles.button} ${styles.saveButton}`}
                onClick={handleSave}
              >
                Сохранить данные
              </button>
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.formGroup}>
              <label>Имя</label>
              <input
                type="text"
                value={userData.firstName}
                onChange={handleInputChange('firstName')}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Фамилия</label>
              <input
                type="text"
                value={userData.lastName}
                onChange={handleInputChange('lastName')}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Отчество</label>
              <input
                type="text"
                value={userData.middleName}
                onChange={handleInputChange('middleName')}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Пол</label>
              <select
                value={userData.gender}
                onChange={handleInputChange('gender')}
              >
                <option value="м">Мужской</option>
                <option value="ж">Женский</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Телефон</label>
              <input
                type="tel"
                value={userData.phone}
                onChange={handleInputChange('phone')}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Почта</label>
              <input
                type="email"
                value={userData.email}
                disabled
                className={styles.disabledInput}
              />
            </div>
          </div>
        </div>

        <div className={styles.statsSection}>
          <h2 className={styles.sectionTitle}>Статистика обучения</h2>
          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                {stat.icon}
                <h3>{stat.title}</h3>
                <p>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.progressSection}>
          <h2 className={styles.sectionTitle}>Прогресс курсов</h2>
          <div className={styles.courseGrid}>
            {inProgressCourses.map(course => (
              <div key={course.id} className={styles.courseCard}>
                <img src={course.image} alt={course.title} className={styles.courseImage} />
                <div className={styles.courseContent}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <div className={styles.courseProgress}>
                    <div 
                      className={styles.progressBar} 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className={styles.progressText}>
                    Прогресс: {course.progress}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};