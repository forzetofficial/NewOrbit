import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { DirectionsPage } from "./pages/DirectionsPage/DirectionsPage";
import { EducationPage } from "./pages/EducationPage/EducationPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { PreparationPage } from "./pages/PreparationPage/PreparationPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { TestPage } from "../src/pages/mailconf/ConfPage";
import { Homemain } from "../src/pages/Homemain/HomemainPage";
import { RefreshPage } from "../src/pages/RefPassword/RefpassPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/directions" element={<DirectionsPage />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/preparation" element={<PreparationPage />} />
      <Route path="/activate/:url" element={<TestPage />} />
      <Route path="/homemain" element={<Homemain />} />
      <Route path="/change_password/:url" element={<RefreshPage />} />
    </Routes>
  );
}

export default App;
