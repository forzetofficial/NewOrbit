import { Navigate, useActionData, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import axios from "axios";

import { Button } from "@mui/material";
import { useState } from "react";

import { useUserStore } from "../../store/useUserStore";

import styles from "./UserInfoPage.module.css";

export function UserInfoPage() {
    return <div>Education</div>;
  }