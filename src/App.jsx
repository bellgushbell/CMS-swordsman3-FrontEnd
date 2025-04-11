import "./i18n"; // Import the i18n configuration file
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "./theme";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import PageSEO from "./pages/PageSEO";
import PageUser from "./pages/PageUser";
import Layout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import PageContent from "./pages/PageContent";
import PageGallery from "./pages/PageGallery";
import CreateContent from "./pages/MenuContent/CreateContent";
import EditContent from "./pages/MenuContent/EditContent";

function App() {
  const { i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // สถานะของ Navbar
  const toggleNavbar = () => setIsNavbarVisible(!isNavbarVisible); // ฟังก์ชันเปิด/ปิด Navbar

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppWithRouter
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            changeLanguage={i18n.changeLanguage}
            theme={isDarkMode ? darkTheme : lightTheme}
            isNavbarVisible={isNavbarVisible}
            toggleNavbar={toggleNavbar}
          />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppWithRouter({
  isDarkMode,
  setIsDarkMode,
  changeLanguage,
  theme,
  isNavbarVisible,
  toggleNavbar,
}) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/"; // ตรวจสอบว่าเป็นหน้า Login หรือไม่

  return (
    <>
      {/* ถ้าไม่ใช่หน้า Login ใช้ Layout */}
      {!isLoginPage && (
        <Layout
          isNavbarVisible={isNavbarVisible}
          toggleNavbar={toggleNavbar}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          changeLanguage={changeLanguage}
          theme={theme}
        >
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/seo" element={<PageSEO />} />
            <Route path="/content" element={<PageContent />} />
            <Route path="/content/edit/:id" element={<EditContent />} />
            <Route path="/user" element={<PageUser />} />
            <Route path="/gallery" element={<PageGallery />} />
            <Route path="/content/create" element={<CreateContent />} />
            {/* ใส่เส้นทางอื่น ๆ ที่คุณต้องการที่นี่ */}
          </Routes>
        </Layout>
      )}

      {/* ถ้าเป็นหน้า Login ไม่ใช้ Layout */}
      {isLoginPage && (
        <Routes>
          <Route
            path="/"
            element={
              <Login
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                changeLanguage={changeLanguage}
                theme={theme}
              />
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;

// frontend/src/App.js
// import React, { useEffect, useState } from "react";
// import { postRequest } from "./services/api"; // ฟังก์ชันที่เราได้เขียนไว้

// const App = () => {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // กำหนดข้อมูล username และ password ที่จะส่งไปยัง Backend
//     const credentials = {
//       username: "admin", // username ที่คุณต้องการส่งไป
//       password: "123456", // password ที่คุณต้องการส่งไป
//     };

//     // เรียกฟังก์ชัน getApiLogin เพื่อนำข้อมูลไปส่ง
//     postRequest("api/auth/login", credentials).then((data) => {
//       setMessage(data.message); // ตั้งค่าข้อความจากคำตอบของ Backend
//     });
//   }, []); // จะทำงานแค่ครั้งเดียวเมื่อเริ่มต้น

//   return (
//     <div>
//       <h1>{message}</h1>
//     </div>
//   );
// };

// export default App;
