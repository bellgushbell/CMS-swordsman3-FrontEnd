import React, { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Header from "../components/Header"; // import Header component

const Layout = ({
  children,
  isDarkMode,
  setIsDarkMode,
  changeLanguage,
  theme,
}) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  // ฟังก์ชันเปิด/ปิด Navbar
  const toggleNavbar = () => {
    setIsNavbarVisible((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header with the toggleNavbar function passed as a prop */}
      <Header
        toggleNavbar={toggleNavbar}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        changeLanguage={changeLanguage}
        theme={theme}
      />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* เพิ่ม marginTop เพื่อหลีกเลี่ยงการทับ */}
        {/* Navbar */}
        <Navbar theme={theme} isVisible={isNavbarVisible} />
        {/* Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            transition: "margin-left 0.3s ease", // เพิ่ม transition เพื่อให้การเคลื่อนไหวลื่นไหล
            padding: "20px", // เพิ่ม padding ให้กับเนื้อหา
            overflow: "auto", // ป้องกันการล้นของเนื้อหา
            boxSizing: "border-box", // ให้การคำนวณขนาดรวม padding
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
