import { Navigate, useActionData, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";

import { Button } from "@mui/material";
import { useState } from "react";

import { useUserStore } from "../../store/useUserStore";

import styles from "./HomemainPage.module.css";

import { User, UserId } from "../../types";

export function Homemain() {
  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.get);

  const userId = localStorage.getItem("userId") as UserId;

  useEffect(() => {
    getUser(userId);
    console.log(user);
  }, [userId]);

  console.log(user.firstname);
  console.log(user.lastname);

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlide = () => {
    setIsOpen(!isOpen);
  };

  const clickInfo = () => {
    navigate("/uinfo");
  };

  const clickExit = () => {
    navigate("/");
  };

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
        <div
          className={`${styles.slideContainer} ${isOpen ? styles.open : ""}`}
        >
          <button className={styles.buttonInfo} onClick={clickInfo}>
            Профиль
          </button>
          <button className={styles.buttonExit} onClick={clickExit}>
            Выход
          </button>
        </div>
      </div>
    </div>
  );
}
