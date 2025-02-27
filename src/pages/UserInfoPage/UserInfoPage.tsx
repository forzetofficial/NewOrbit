import { Navigate, useActionData, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";

import { Button } from "@mui/material";
import { useState } from "react";

import { useUserStore } from "../../store/useUserStore";

import styles from "./UserInfoPage.module.css";

export function UserInfoPage() {
  return (
    <>
      <header className={styles.headermain}>
        <h2 className={styles.head_main_name}>Личный кабинет</h2>
      </header>
      <div className={styles.main}>
        <div className={styles.bodys}>
          <div className={styles.left}>
            <div className={styles.foto}></div>
            <button className={styles.but_upload_foto}>Изменить фото</button>
            <button className={styles.setinfo}>Сохранить данные</button>
          </div>
          <div className={styles.right}>
            <div className={styles.box1}>
              <div className={styles.firstname}>
                <header className={styles.headtext}>Имя</header>
                <input className={styles.input}>
                </input>
                <hr></hr>
              </div>
              <div className={styles.middlename}>
                <header className={styles.headtext}>Фамилия</header>
                <input className={styles.input}>
                </input>
                <hr></hr>
              </div>
              <div className={styles.lastname}>
                <header className={styles.headtext}>Отчество</header>
                <input className={styles.input}>
                </input>
                <hr></hr>
              </div>
            </div>
            <div className={styles.box2}>
              <div className={styles.gender}>
                <header className={styles.headtext}>Пол</header>
                <input className={styles.input}>
                </input>
                <hr></hr>
              </div>
              <div className={styles.phone}>
                <header className={styles.headtext}>Телефон</header>
                <input className={styles.input}>
                </input>
                <hr></hr>
              </div>
              <div className={styles.email}>
                <header className={styles.headtext}>Почта</header>
                <input className={styles.input}>
                </input>
                <hr></hr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
