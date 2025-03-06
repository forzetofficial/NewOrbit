import React, { useState } from 'react';
import { BookOpen, CheckCircle, Circle, Clock } from 'lucide-react';
import styles from './MyLearning.module.css';
import Header from './Header';

interface Lecture {
  id: number;
  title: string;
  duration: string;
  status: 'completed' | 'inProgress' | 'notStarted';
}

interface Course {
  id: number;
  title: string;
  progress: number;
  lectures: Lecture[];
}

export const MyLearning = () => {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  const courses: Course[] = [
    {
      id: 1,
      title: 'JavaScript Основы',
      progress: 75,
      lectures: [
        { id: 1, title: 'Введение в JavaScript', duration: '45 мин', status: 'completed' },
        { id: 2, title: 'Переменные и типы данных', duration: '60 мин', status: 'completed' },
        { id: 3, title: 'Функции и области видимости', duration: '55 мин', status: 'inProgress' },
        { id: 4, title: 'Объекты и массивы', duration: '50 мин', status: 'notStarted' },
      ]
    },
    {
      id: 2,
      title: 'React для начинающих',
      progress: 45,
      lectures: [
        { id: 1, title: 'Введение в React', duration: '40 мин', status: 'completed' },
        { id: 2, title: 'Компоненты и пропсы', duration: '65 мин', status: 'completed' },
        { id: 3, title: 'Состояние и жизненный цикл', duration: '70 мин', status: 'inProgress' },
        { id: 4, title: 'Хуки в React', duration: '60 мин', status: 'notStarted' },
      ]
    },
    {
      id: 3,
      title: 'TypeScript продвинутый',
      progress: 30,
      lectures: [
        { id: 1, title: 'Введение в TypeScript', duration: '50 мин', status: 'completed' },
        { id: 2, title: 'Типы и интерфейсы', duration: '55 мин', status: 'inProgress' },
        { id: 3, title: 'Генерики', duration: '65 мин', status: 'notStarted' },
        { id: 4, title: 'Декораторы', duration: '45 мин', status: 'notStarted' },
      ]
    }
  ];

  const getLectureIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-400" size={20} />;
      case 'inProgress':
        return <Clock className="text-yellow-400" size={20} />;
      default:
        return <Circle className="text-slate-400" size={20} />;
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.courseList}>
        {courses.map(course => (
          <div key={course.id} className={styles.courseCard}>
            <div className={styles.courseHeader}>
              <div className={styles.courseInfo}>
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
              <button
                onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                className="text-blue-400 hover:text-blue-300"
              >
                <BookOpen size={24} />
              </button>
            </div>

            {expandedCourse === course.id && (
              <div className={styles.lectureList}>
                {course.lectures.map(lecture => (
                  <div key={lecture.id} className={styles.lecture}>
                    <div className={styles.lectureIcon}>
                      {getLectureIcon(lecture.status)}
                    </div>
                    <div className={styles.lectureInfo}>
                      <h4 className={styles.lectureName}>{lecture.title}</h4>
                      <span className={styles.lectureDuration}>{lecture.duration}</span>
                    </div>
                    <span className={`${styles.lectureStatus} ${styles[lecture.status]}`}>
                      {lecture.status === 'completed' && 'Завершено'}
                      {lecture.status === 'inProgress' && 'В процессе'}
                      {lecture.status === 'notStarted' && 'Не начато'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLearning;