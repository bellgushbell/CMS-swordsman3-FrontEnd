import React, { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import TranslateIcon from "@mui/icons-material/Translate";
import NightsStayIcon from "@mui/icons-material/NightsStay";

const Header = ({
  toggleNavbar,
  isDarkMode,
  setIsDarkMode,
  changeLanguage,
  theme,
}) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLanguageChange = (lng) => {
    localStorage.setItem("lang", lng);
    changeLanguage(lng);
    handleMenuClose(); // ปิดเมนูหลังจากเลือก
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: theme.navbar.background }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleNavbar}
          sx={{ color: "white" }}
        >
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>

        {/* ใช้ Box เพื่อดันไอคอนไปชิดขวา */}
        <Box sx={{ marginLeft: "auto" }}>
          {/* ปุ่มโหมดมืด/สว่าง */}
          <IconButton
            onClick={() => setIsDarkMode(!isDarkMode)}
            color="default"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: "50%",
              padding: "8px",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {isDarkMode ? <NightsStayIcon /> : <WbSunnyIcon />}
          </IconButton>

          {/* ปุ่มเปลี่ยนภาษา */}
          <IconButton
            color="inherit"
            sx={{
              marginLeft: "8px",
              color: theme.palette.text.main,
              backgroundColor: theme.palette.background.paper,
              borderRadius: "50%",
              padding: "8px",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
            onClick={handleMenuOpen}
          >
            <TranslateIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleLanguageChange("en")}>EN</MenuItem>
            <MenuItem onClick={() => handleLanguageChange("th")}>TH</MenuItem>
            <MenuItem onClick={() => handleLanguageChange("zh")}>ZH</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
