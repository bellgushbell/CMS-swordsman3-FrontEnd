import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const TextHeader = ({ title }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: "center", marginBottom: "16px" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontSize: {
            xs: "1rem", // ขนาดเล็ก (มือถือ)
            sm: "1.5rem", // แท็บเล็ต
            md: "2rem", // หน้าจอปกติ
            lg: "2.5rem", // หน้าจอใหญ่
          },
          [theme.breakpoints.down("sm")]: {
            textAlign: "left", // ปรับตำแหน่งเมื่อจอเล็ก
          },
        }}
      >
        {t(title)}
      </Typography>
    </Box>
  );
};

export default TextHeader;
