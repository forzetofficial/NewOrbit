import { Navigate, useActionData, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import Header from './Header';
import { Button } from "@mui/material";
import { useState } from "react";

import { useUserStore } from "../../store/useUserStore";

import styles from "./HomemainPage.module.css";

import { User, UserId } from "../../types";

import { Search, Book, Trophy, Clock } from 'lucide-react';


export const Homemain = () => {
  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.get);

  const userId = localStorage.getItem("userId") as UserId;

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  const stats = [
    { icon: <Book size={32} />, title: 'Активные курсы', value: '3' },
    { icon: <Trophy size={32} />, title: 'Завершено курсов', value: '5' },
    { icon: <Clock size={32} />, title: 'Часов обучения', value: '47' },
  ];

  const inProgressCourses = [
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

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.stats}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            {stat.icon}
            <h3 className="mt-2 text-lg">{stat.title}</h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className={styles.searchContainer}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск курсов..."
            className={styles.searchInput}
          />
        </div>
      </div>

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
              <p className="mt-2 text-sm text-slate-400">
                Прогресс: {course.progress}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};