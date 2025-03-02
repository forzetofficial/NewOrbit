import { Navigate, useActionData, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";

import { Button } from "@mui/material";
import { useState } from "react";

import { User, UserId } from "../../types";

import { useUserStore } from "../../store/useUserStore";
import { useAuthStore } from "../../store/useAuthStore";

import styles from "./UserInfoPage.module.css";


export function UserInfoPage() {

  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.get);
  const userId = localStorage.getItem("userId") as UserId;
  const emailUser = useAuthStore((state) => state.email);

  const [elem_firstname, Set_elem_firstname] = useState("No elem");
  const [elem_middlename, Set_elem_middlename] = useState("No elem");
  const [elem_lastname, Set_elem_lastname] = useState("No elem");
  const [elem_gender, Set_elem_gender] = useState("No elem");
  const [elem_phone, Set_elem_phone] = useState("No elem");
  const [elem_email, Set_elem_email] = useState("No elem");

  useEffect(() => {
  getUser(userId);
  if (user.firstname !== '') Set_elem_firstname(user.firstname);
  if (typeof(user.middlename) !== "undefined") Set_elem_middlename(user.middlename);
  if (typeof(user.lastname) !== "undefined") Set_elem_lastname(user.lastname);
  if (typeof(user.gender) !== "undefined") Set_elem_gender(user.gender);
  if (typeof(user.phone) !== "undefined") Set_elem_phone(user.phone);
  if (typeof(emailUser) !== "undefined") Set_elem_email(emailUser); 
  }, [userId]);


  const navigate = useNavigate();

  const click_exit = () => {
    navigate('/homemain');
  }

  const handlefirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    Set_elem_firstname(event.target.value);
  };
  const handlemiddlename = (event: React.ChangeEvent<HTMLInputElement>) => {
    Set_elem_middlename(event.target.value);
  };
  const handlelastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    Set_elem_lastname(event.target.value);
  };
  const handlegender = (event: React.ChangeEvent<HTMLInputElement>) => {
    Set_elem_gender(event.target.value);
  };
  const handlephone = (event: React.ChangeEvent<HTMLInputElement>) => {
    Set_elem_phone(event.target.value);
  };

  const { updateInfo, error } = useUserStore();
  const handleUpdateInfo = async () => {
    await updateInfo(userId, elem_firstname, elem_gender, "test", elem_lastname, elem_middlename, elem_phone);
  };
  

  return (
    <>
      <header className={styles.headermain}>
        <h2 className={styles.head_main_name}>Личный кабинет</h2>
        <div className={styles.rigth_head}>
          <div className={styles.foto_main}></div>
          <div className={styles.info_name}>
            <h4 className={styles.h_name}>{elem_firstname}</h4>
            <h5 className={styles.h_num}>{elem_phone}</h5>
          </div>
          <hr className={styles.hr_main}></hr>
          <button className={styles.icon_exit} onClick={click_exit}></button>
        </div>
      </header>
      <div className={styles.main}>
        <div className={styles.bodys}>
          <div className={styles.left}>
            <div className={styles.foto}></div>
            <button className={styles.but_upload_foto}>Изменить фото</button>
            <button className={styles.setinfo} onClick={handleUpdateInfo}>Сохранить данные</button>
          </div>
          <div className={styles.right}>
            <div className={styles.box1}>
              <div className={styles.firstname}>
                <header className={styles.headtext}>Имя</header>
                <input type="text" placeholder={elem_firstname} onChange={handlefirstname} className={styles.input}></input>
                <hr></hr>
              </div>
              <div className={styles.middlename}>
                <header className={styles.headtext}>Фамилия</header>
                <input type="text" placeholder={elem_middlename} onChange={handlemiddlename} className={styles.input}></input>
                <hr></hr>
              </div>
              <div className={styles.lastname}>
                <header className={styles.headtext}>Отчество</header>
                <input type="text" placeholder={elem_lastname} onChange={handlelastname} className={styles.input}></input>
                <hr></hr>
              </div>
            </div>
            <div className={styles.box2}>
              <div className={styles.gender}>
                <header className={styles.headtext}>Пол</header>
                <input type="text" placeholder={elem_gender} onChange={handlegender} className={styles.input}></input>
                <hr></hr>
              </div>
              <div className={styles.phone}>
                <header className={styles.headtext}>Телефон</header>
                <input type="tel" placeholder={elem_phone} onChange={handlephone} className={styles.input}></input>
                <hr></hr>
              </div>
              <div className={styles.email}>
                <header className={styles.headtext}>Почта</header>
                <input placeholder={elem_email} className={styles.input}></input>
                <hr></hr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
