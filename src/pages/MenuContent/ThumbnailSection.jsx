import React, { useEffect, useState } from "react";
import {
  Box,
  Chip,
  Button,
  Divider,
  useTheme,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { postRequest } from "../../services/api";
import ImageUpload from "../ImageUpload";

const ThumbnailSection = ({
  data,
  setData,
  handleChange,
  handleImageUploadtodata,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingS, setIsEditingS] = useState(false);
  const [isSelectVisible, setIsSelectVisible] = useState(true);
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (event, newValue) => {
    setData((prevData) => ({ ...prevData, category: newValue }));
    setIsSelectVisible(false);
  };

  const toggleEditing = (field) => {
    if (field === "header_thumbnail") {
      setIsEditing((prev) => !prev);
    } else if (field === "sub_header_thumbnail") {
      setIsEditingS((prev) => !prev);
    }
  };

  const handleBlur = (field) => {
    if (field === "header_thumbnail") {
      setIsEditing(false);
    } else if (field === "sub_header_thumbnail") {
      setIsEditingS(false);
    }
  };

  const fetchCategory = async () => {
    try {
      const language = localStorage.getItem("i18nextLng"); // Ensure it is retrieved as a string

      const response = await postRequest("database/admin/get_category.php", {
        language: language,
      }); // Requesting all resources

      // console.log(response.data); // Log the response data for debugging
      setCategories(
        response.data.data.map((item) => ({
          value: item.value,
          label: item.label, // Corrected dynamic key access
        }))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [localStorage.getItem("i18nextLng")]); // Fetch categories when language changes

  const handleImageUpload = (url, extension) => {
    // console.log(url);
    // console.log(extension);
    handleImageUploadtodata(extension);
    setData((prevData) => ({
      ...prevData,
      image: extension?.name, // เก็บ URL พร้อมนามสกุลลงใน state
    }));
  };

  return (
    <>
      {/* ส่วนของ Thumbnail */}
      <Divider>
        <Chip
          label={t("create_thumbnail")}
          size="large"
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            color: "white",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            marginBottom: "10px",
            marginTop: "10px",
          }}
        />
      </Divider>

      {/* รูปแบบการแสดง Thumbnail */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: isOpen ? "300px" : "0", // ควบคุมความสูงสูงสุดของ div
          overflow: "hidden", // ซ่อนเนื้อหาภายในเมื่อปิด
          transition: "max-height 0.5s ease-out", // ทำให้การเลื่อนช้าลง
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "200px",
            borderBottom: "2px solid #bdbdbd",
            paddingBottom: "10px",
          }}
        >
          <ImageUpload data={data?.image} onImageUpload={handleImageUpload} />

          <Box
            flex={1}
            padding={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
            }}
          >
            {/* Autocomplete หรือ Button สำหรับเลือกหมวดหมู่ */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {isSelectVisible ? (
                <Autocomplete
                  value={data?.category ?? null}
                  onChange={handleCategoryChange}
                  options={categories}
                  getOptionLabel={(option) => option?.label ?? ""}
                  renderInput={(params) => (
                    <TextField {...params} label={t("category")} />
                  )}
                  disableClearable
                  sx={{ width: "30%" }}
                />
              ) : (
                <Button
                  onClick={() => setIsSelectVisible(true)}
                  variant="outlined"
                  sx={{
                    backgroundColor: data?.category
                      ? getBackgroundColor(data?.category.value)
                      : "transparent",
                    border: "none",
                    color: "white",
                    "&:hover": {
                      backgroundColor: data?.category
                        ? getBackgroundColor(data?.category.value)
                        : "transparent",
                    },
                  }}
                >
                  {data?.category ? data?.category.label : "เลือกตัวเลือก"}
                </Button>
              )}
              <Typography variant="body1">{data?.date}</Typography>
            </Box>

            {/* Header (ส่วนบนของเนื้อหา) */}
            {isEditing ? (
              <TextField
                value={data?.header_thumbnail}
                onBlur={() => handleBlur("header_thumbnail")}
                onChange={handleChange("header_thumbnail")}
                autoFocus
                inputProps={{ maxLength: 60 }}
                sx={{ marginTop: 2, width: "100%" }}
              />
            ) : (
              <Typography
                variant="h6"
                sx={{
                  marginTop: 2,
                  cursor: "pointer",
                  marginLeft: 1,
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
                onClick={() => toggleEditing("header_thumbnail")}
              >
                {data?.header_thumbnail || t("please_enter_header")}
              </Typography>
            )}

            {/* Subtitle (ส่วนล่างของเนื้อหา) */}
            {isEditingS ? (
              <TextField
                value={data?.sub_header_thumbnail}
                onBlur={() => handleBlur("sub_header_thumbnail")}
                onChange={handleChange("sub_header_thumbnail")}
                autoFocus
                multiline
                minRows={2} // กำหนดแถวขั้นต่ำ
                maxRows={6} // กำหนดแถวสูงสุด
                sx={{ width: "100%" }}
              />
            ) : (
              <Typography
                variant="h6"
                sx={{
                  cursor: "pointer",
                  marginLeft: 1,
                  fontSize: "12px",
                  whiteSpace: "pre-line",
                  wordWrap: "break-word",
                }}
                onClick={() => toggleEditing("sub_header_thumbnail")}
              >
                {data?.sub_header_thumbnail || t("please_enter_sub_header")}
              </Typography>
            )}
          </Box>
        </div>
      </div>
    </>
  );
};
function getBackgroundColor(value) {
  switch (value) {
    case 1:
      return "#7FA9D1";
    case 2:
      return "#997FD1";
    case 3:
      return "#D18A7F";
    default:
      return "transparent";
  }
}
export default ThumbnailSection;
