import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";

export function TestPage() {
  const navigate = useNavigate();
  const params = useParams();

  const handleLoad = async () => {
    const link = params.url;
    try {
      const response = await axios.post(
        "https://cookhub.space/api/v1/auth/activate_account",
        {
          link,
        }
      );

      if (response.status === 200) {
        navigate("/auth");
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      if (error.response) {
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);
      } else {
        console.log("Error message:", error.message);
      }
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}
