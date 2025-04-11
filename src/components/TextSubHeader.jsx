import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const TextSubHeader = ({ title }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        width: "70%",
        margin: "auto",
      }}
    >
      <Box
        sx={{ border: "2px solid black", padding: "8px", marginBottom: "10px" }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "12px", // ขนาดเล็ก (มือถือ)
              sm: "16px", // แท็บเล็ต
              md: "16px", // หน้าจอปกติ
              lg: "18px", // หน้าจอใหญ่
            },
            [theme.breakpoints.down("sm")]: {
              textAlign: "left", // ปรับตำแหน่งเมื่อจอเล็ก
            },
          }}
        >
          {t(title)}
        </Typography>
      </Box>
    </div>
  );
};

export default TextSubHeader;
