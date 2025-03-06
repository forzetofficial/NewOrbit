import React, { useState } from 'react';
import { Search, Code2, BookOpen, Star, X } from 'lucide-react';
import styles from './Courses.module.css';
import Header from './Header';

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  language: string;
  level: string;
  duration: string;
  rating: number;
}

export const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const courses: Course[] = [
    {
      id: 1,
      title: 'JavaScript Основы',
      description: 'Изучите основы JavaScript с нуля. Курс включает в себя все необходимые концепции для начала работы с языком.',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=80',
      language: 'javascript',
      level: 'beginner',
      duration: '20 часов',
      rating: 4.8
    },
    {
      id: 2,
      title: 'React для начинающих',
      description: 'Погрузитесь в мир React и создавайте современные веб-приложения. Изучите хуки, компоненты и многое другое.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
      language: 'react',
      level: 'intermediate',
      duration: '25 часов',
      rating: 4.9
    },
    {
      id: 3,
      title: 'TypeScript продвинутый',
      description: 'Освойте продвинутые концепции TypeScript. Генерики, утилитные типы, декораторы и многое другое.',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=80',
      language: 'typescript',
      level: 'advanced',
      duration: '30 часов',
      rating: 4.7
    },
  ];

  const filteredCourses = courses.filter(course => {
    const languageMatch = selectedLanguage === 'all' || course.language === selectedLanguage;
    const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
    return languageMatch && levelMatch;
  });

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.sidebar}>
        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>Язык программирования</h3>
          <div className={styles.filterOption}>
            <input
              type="radio"
              name="language"
              checked={selectedLanguage === 'all'}
              onChange={() => setSelectedLanguage('all')}
            />
            <span>Все языки</span>
          </div>
          <div className={styles.filterOption}>
            <input
              type="radio"
              name="language"
              checked={selectedLanguage === 'javascript'}
              onChange={() => setSelectedLanguage('javascript')}
            />
            <span>JavaScript</span>
          </div>
          <div className={styles.filterOption}>
            <input
              type="radio"
              name="language"
              checked={selectedLanguage === 'typescript'}
              onChange={() => setSelectedLanguage('typescript')}
            />
            <span>TypeScript</span>
          </div>
          <div className={styles.filterOption}>
            <input
              type="radio"
              name="language"
              checked={selectedLanguage === 'react'}
              onChange={() => setSelectedLanguage('react')}
            />
            <span>React</span>
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>Уровень сложности</h3>
          <div className={styles.filterOption}>
            <input
              type="radio"
              name="level"
              checked={selectedLevel === 'all'}
              onChange={() => setSelectedLevel('all')}
            />
            <span>Все уровни</span>
          </div>
          <div className={styles.filterOption}>
            <input
              type="radio"
              name="level"
              checked={selectedLevel === 'beginner'}
              onChange={() => setSelectedLevel('beginner')}
            />
            <span>Начальный</span>
          </div>
          <div className={styles.filterOption}>
            <input
              type="radio"
              name="level"
              checked={selectedLevel === 'intermediate'}
              onChange={() => setSelectedLevel('intermediate')}
            />
            <span>Средний</span>
          </div>
          <div className={styles.filterOption}>
            <input
              type="radio"
              name="level"
              checked={selectedLevel === 'advanced'}
              onChange={() => setSelectedLevel('advanced')}
            />
            <span>Продвинутый</span>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.courseGrid}>
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className={styles.courseCard}
              onClick={() => setSelectedCourse(course)}
            >
              <img src={course.image} alt={course.title} className={styles.courseImage} />
              <div className={styles.courseContent}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.courseDescription}>{course.description}</p>
                <div className={styles.courseStats}>
                  <span><Code2 size={16} className="inline mr-1" /> {course.language}</span>
                  <span><BookOpen size={16} className="inline mr-1" /> {course.duration}</span>
                  <span><Star size={16} className="inline mr-1" /> {course.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCourse && (
        <div className={styles.modal} onClick={() => setSelectedCourse(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{selectedCourse.title}</h2>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedCourse(null)}
              >
                <X size={24} />
              </button>
            </div>
            <img
              src={selectedCourse.image}
              alt={selectedCourse.title}
              className={styles.courseImage}
            />
            <p className="text-slate-300 mt-4">{selectedCourse.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-slate-300">
              <div>
                <strong>Язык:</strong> {selectedCourse.language}
              </div>
              <div>
                <strong>Уровень:</strong> {selectedCourse.level}
              </div>
              <div>
                <strong>Длительность:</strong> {selectedCourse.duration}
              </div>
              <div>
                <strong>Рейтинг:</strong> {selectedCourse.rating}
              </div>
            </div>
            <button className={styles.startButton}>
              Начать обучение
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;