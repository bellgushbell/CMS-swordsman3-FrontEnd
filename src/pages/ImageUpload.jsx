import React, { useState } from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material"; // นำเข้า Snackbar และ Alert

const ImageUpload = ({ data, onImageUpload }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(""); // ใช้เก็บข้อความผิดพลาด
  const [openSnackbar, setOpenSnackbar] = useState(false); // สถานะการเปิด Snackbar

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const MAX_WIDTH = 900; // ขนาดสูงสุดของความกว้าง
  const MAX_HEIGHT = 500; // ขนาดสูงสุดของความสูง

  // ฟังก์ชันตรวจสอบการอัพโหลดรูปภาพ
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      // ตรวจสอบขนาดไฟล์
      if (file.size > MAX_FILE_SIZE) {
        setError("ไฟล์มีขนาดใหญ่เกินไป (ขนาดไฟล์ไม่เกิน 2MB)");
        setOpenSnackbar(true); // เปิด Snackbar แสดงข้อผิดพลาด
        setPreview(null); // รีเซ็ตการแสดงตัวอย่าง
        return;
      }

      // โหลดภาพเพื่อตรวจสอบขนาด
      const img = new Image();
      img.onload = () => {
        // ตรวจสอบขนาดของภาพ (Width x Height)
        if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
          setError(
            `ขนาดภาพใหญ่เกินไป (สูงสุด ${MAX_WIDTH}x${MAX_HEIGHT} พิกเซล)`
          );
          setOpenSnackbar(true); // เปิด Snackbar แสดงข้อผิดพลาด
          setPreview(null); // รีเซ็ตการแสดงตัวอย่าง
        } else {
          const objectURL = URL.createObjectURL(file);
          setPreview(objectURL); // แสดงตัวอย่างรูปภาพ
          setError(""); // รีเซ็ตข้อความผิดพลาด

          onImageUpload(objectURL, file); // ส่ง URL และนามสกุลไฟล์กลับไปที่ parent component
        }
      };
      img.src = URL.createObjectURL(file); // โหลดภาพเพื่อตรวจสอบขนาด
    }
  };

  // ปิด Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      width={300}
      height={168}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: preview ? "none" : "2px dashed black", // Remove dashed border when preview exists
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        marginLeft: "20px",
      }}
      component="label"
    >
      <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
      {preview ? (
        <img
          src={preview}
          alt="Thumbnail Preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <Typography variant="h6">Upload Thumbnail</Typography>
      )}

      {/* แสดง Snackbar ถ้ามีข้อความผิดพลาด */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000} // หายไปหลังจาก 4 วินาที
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error} {/* แสดงข้อความผิดพลาด */}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ImageUpload;
