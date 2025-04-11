import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AccountCircle, Language } from "@mui/icons-material"; // 🔹 เพิ่มไอคอน
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // ไอคอนสำหรับธีมสว่าง
import NightsStayIcon from "@mui/icons-material/NightsStay"; // ไอคอนสำหรับธีมมืด
import * as Yup from "yup";
import { postRequest } from "../services/api";
import { AuthContext } from "../context/AuthContext"; // นำเข้า AuthContext

function Login({ isDarkMode, setIsDarkMode, changeLanguage, theme }) {
  const { login } = useContext(AuthContext); // ใช้ Context เพื่อเข้าถึงฟังก์ชัน login

  const { t } = useTranslation();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // สร้าง schema validation ด้วย Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const validateField = async (fieldName, value) => {
    try {
      await validationSchema.validateAt(fieldName, { [fieldName]: value });
      return ""; // If no error, return empty string
    } catch (err) {
      return err.message;
    }
  };

  // เช็คขนาดหน้าจอ (ถ้า < 600px จะเป็นมือถือ)
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleLogin = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บเมื่อ submit form

    const datalogin = await postRequest(
      "database/admin/process_login.php",
      data
    ); // ส่งข้อมูลไปยัง API
    // console.log(datalogin); // หากต้องการดูข้อมูลจาก API

    if (datalogin.status === 200) {
      // ถ้าการเข้าสู่ระบบสำเร็จ
      let fieldErrors = {}; // สร้างอ็อบเจ็กต์เพื่อเก็บข้อผิดพลาด

      // Validate each field by looping through the keys
      for (const field in data) {
        if (data.hasOwnProperty(field)) {
          const error = await validateField(field, data[field]); // ตรวจสอบข้อผิดพลาด
          if (error) {
            fieldErrors[field] = error; // เก็บข้อผิดพลาดใน fieldErrors
          }
        }
      }

      if (Object.keys(fieldErrors).length > 0) {
        setError(fieldErrors); // แสดงข้อผิดพลาด
      } else {
        // console.log("Form submitted successfully", data); // หากไม่มีข้อผิดพลาด
        // await login(data.username, data.password);  // การเข้าสู่ระบบจริง ๆ (ถ้าจำเป็น)
        const userData = datalogin.data; // สมมติว่า API ส่งข้อมูลผู้ใช้กลับมาในฟิลด์ data
        login(userData.data); // เก็บข้อมูลผู้ใช้ใน Context
        navigate("/content"); // ไปยังหน้า Dashboard หลังจากเข้าสู่ระบบ
      }
    } else {
      // หากการเข้าสู่ระบบไม่สำเร็จ
      setError({ api: "Login failed, please check your credentials" }); // แสดงข้อความข้อผิดพลาดจาก API
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    handleMenuClose(); // ปิดเมนูหลังจากเลือก
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: theme.palette.background_login,
        position: "relative",
      }}
    >
      {/* 🔹 Box สำหรับไอคอนธีมและภาษา */}
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          width: "90%",
          maxWidth: 900,
          background: theme.navbar.background,
          borderRadius: 3,
          padding: 1,
          position: "relative", // ทำให้ไอคอนสามารถวางที่ตำแหน่งที่ต้องการ
        }}
      >
        {/* 🔹 ส่วนของฟอร์มและรูปการ์ตูน */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: 900,
            background: theme.palette.background_BoxLogin.main,
            borderRadius: 3,
            boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            padding: 4,
            position: "relative",
          }}
        >
          {/* 🔹 รูปการ์ตูน */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: isMobile ? "100%" : "50%",
              padding: 2,
            }}
          >
            <img
              src="../images/free-icon-cms-2867263.png"
              alt="Mascot"
              style={{ width: "80%", maxWidth: 250, height: "auto" }}
            />
          </Box>

          {/* 🔹 ฟอร์มล็อกอิน */}
          <Box
            sx={{
              flex: 1,
              width: isMobile ? "100%" : "50%",
              textAlign: "center",
              padding: 2,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: theme.palette.text.main,
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: 1.5,
                textAlign: "center",
                background: `linear-gradient(45deg, ${theme.palette.text.main}, ${theme.palette.text.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("login")}
            </Typography>

            <form onSubmit={handleLogin}>
              <TextField
                label={t("username")}
                variant="outlined"
                fullWidth
                margin="normal"
                value={data?.username}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, username: e.target.value }));
                  setError((prev) => ({ ...prev, username: "" })); // รีเซ็ต error ของ username เมื่อพิมพ์
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                error={Boolean(error.username)}
                helperText={error.username || ""}
              />

              <TextField
                label={t("password")}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                value={data?.password}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, password: e.target.value }));
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(error.password)} // ถ้ามี error จะทำให้กรอบเป็นสีแดง
                helperText={error.password || ""}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!data?.username || !data?.password}
                sx={{
                  marginTop: 2,
                  padding: "12px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  bgcolor: theme.button.backgroundColor,
                  color: theme.button.textColor,
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    bgcolor: theme.palette.secondary.main,
                    transform: "scale(1.05)",
                  },
                  "&:disabled": {
                    bgcolor: "#ccc",
                    color: "#888",
                    boxShadow: "none",
                  },
                }}
              >
                {t("login")}
              </Button>
            </form>
          </Box>
        </Box>

        {/* 🔹 ปุ่มเปลี่ยนธีม */}

        <IconButton onClick={() => setIsDarkMode(!isDarkMode)} color="default">
          {isDarkMode ? <NightsStayIcon /> : <WbSunnyIcon />}
        </IconButton>
        {/* 🔹 ปุ่มเปลี่ยนภาษา */}
        <IconButton
          color="inherit"
          sx={{
            color: theme.palette.text.main, // ใช้สีจาก text.main ในธีม
          }}
          onClick={handleMenuOpen}
        >
          <Language />
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
    </Box>
  );
}

export default Login;
