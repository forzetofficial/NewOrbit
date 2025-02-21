import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import axios from "axios";

import { Button } from "@mui/material";
import { useState } from "react";

import styles from "./Refpass.module.css";

export function RefreshPage() {
  const navigate = useNavigate();
  const params = useParams();

  const clickrev = () => {navigate("/auth");};

  const [pass1, setPasswordreg1] = useState("");
  const Pass1set = (event: React.ChangeEvent<HTMLInputElement>) => {setPasswordreg1(event.target.value);};
  const [pass2, setPasswordreg2] = useState("");
  const Pass2set = (event: React.ChangeEvent<HTMLInputElement>) => {setPasswordreg2(event.target.value);};
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;

  const clicktest = async () => {
    const link = params.url;

    if (passwordRegex.test(pass1) && pass1 === pass2) {
      const password = pass1;
      try {
        const response = await axios.post("https://cookhub.space/api/v1/auth/change_password", {
            link,
            password,
        });


        if (response.status === 200) { 
            navigate("/Auth");
        } 
      } catch (error: any) {

        console.error('Error during registration:', error);
        if (error.response) {

          console.log("Error status:", error.response.status);
          console.log("Error data:", error.response.data);
        } else {

          console.log("Error message:", error.message);
        }
      }
    }
  };

    return <>
    <div className={styles.sky}>
      <div className={styles.stars}></div>
      <div className={styles.stars1}></div>
      <div className={styles.stars2}></div>
      <div className={styles.shootingstars}></div>
        <div className={styles.auth}>
          <div className={styles.Headbox}>
            <header className={styles.HEAD}>ИЗМЕНЕНИЕ ПАРОЛЯ</header>
            <h5 className={styles.Smena}>Введите новый пароль, чтобы изменить текущий </h5>
            <h5 className={styles.Passwordtext2}>Новый пароль</h5>
            <input
            type="password"
            value={pass1}
            onChange={Pass1set}
            placeholder="Введите пароль"
            style={{
              width: "75%",
              padding: "10px",
              borderRadius: "20px",
              fontSize: "16px",
              margin: "0 auto",
              display: "block",
            }}
          />
            <h5 className={styles.Passwordtext11}>Повтор пароля </h5>
            <input
            type="password"
            value={pass2}
            onChange={Pass2set}
            placeholder="Введите пароль"
            style={{
              width: "75%",
              padding: "10px",
              borderRadius: "20px",
              fontSize: "16px",
              margin: "0 auto",
              display: "block",
            }}
          />
            <div className={styles.Button}>
              <button className={styles.buttonrev} onClick={clicktest}>
                Сохранить
              </button>
            </div>
            <Button
              onClick={clickrev}
              color="primary"
              sx={{
                color: "white",
                fontSize: 11,
                top: 40,
                left: 190,
              }}
            >
              Назад ко входу
            </Button>
          </div>
        </div>
      </div>
    </>
  }