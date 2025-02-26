import { Navigate, useActionData, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import axios from "axios";

import { Button } from "@mui/material";
import { useState } from "react";

import { useUserStore } from "../../store/useUserStore";

import styles from "./HomemainPage.module.css";

import { User, UserId } from '../../types';

export function Homemain() {
  console.log(localStorage.getItem("u_firstname"));
  console.log(localStorage.getItem("u_middlename"));
  console.log(localStorage.getItem("u_lastname"));
  console.log(localStorage.getItem("u_gender"));
  console.log(localStorage.getItem("u_phone"));

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlide = () => {
    setIsOpen(!isOpen);
  };

  const clickInfo = () => {
    navigate("/uinfo");
  }

  const clickExit = () => {
    navigate("/");
  }

    return (
      <div>
        <div className={styles.starscontainer}>
          <div className={styles.stars}></div>
          <div className={styles.stars2}></div>
          <div className={styles.stars3}></div>
          <header className={styles.mainheader}>
            <h2 className={styles.lefthead}>ОРБИТА УСПЕХА</h2>
            <h3 className={styles.centerhead}>Главная страница</h3>
            <circle className={styles.righthead} onClick={toggleSlide}></circle>
          </header>
          <div className={`${styles.slideContainer} ${isOpen ? styles.open : ''}`}>
            <button className={styles.buttonInfo} onClick={clickInfo}>Профиль</button>
            <button className={styles.buttonExit} onClick={clickExit}>Выход</button>
          </div>
        </div>
      </div>      
    );
  }