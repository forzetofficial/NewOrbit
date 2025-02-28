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
        <div className={styles.rigth_head}>
          <div className={styles.foto_main}></div>
          <div className={styles.info_name}>
            <h4 className={styles.h_name}>Белолипецкий Леонид</h4>
            <h5 className={styles.h_num}>+7 991 209-17-65</h5>
          </div>
          <hr className={styles.hr_main}></hr>
          <button className={styles.icon_exit}></button>
        </div>
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
                <input className={styles.input}></input>
                <hr></hr>
              </div>
              <div className={styles.middlename}>
                <header className={styles.headtext}>Фамилия</header>
                <input className={styles.input}></input>
                <hr></hr>
              </div>
              <div className={styles.lastname}>
                <header className={styles.headtext}>Отчество</header>
                <input className={styles.input}></input>
                <hr></hr>
              </div>
            </div>
            <div className={styles.box2}>
              <div className={styles.gender}>
                <header className={styles.headtext}>Пол</header>
                <input className={styles.input}></input>
                <hr></hr>
              </div>
              <div className={styles.phone}>
                <header className={styles.headtext}>Телефон</header>
                <input className={styles.input}></input>
                <hr></hr>
              </div>
              <div className={styles.email}>
                <header className={styles.headtext}>Почта</header>
                <input className={styles.input}></input>
                <hr></hr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
