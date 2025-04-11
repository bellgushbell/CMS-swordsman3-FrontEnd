import React, { useContext, useEffect, useState } from "react";
import TextHeader from "../../components/TextHeader";
import ThumbnailSection from "./ThumbnailSection";
import SeoSection from "./SEOSection";
import ContentSection from "./ContentSection";
import { Button, Chip, Divider, Stack, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Delete, Save } from "@mui/icons-material";
import { postImage, postRequest } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
export const CreateContent = () => {
  const { user } = useContext(AuthContext); // ใช้ Context เพื่อเข้าถึงข้อมูลผู้ใช้
  const [selectedFile, setSelectedFile] = useState(null); // เก็บไฟล์ที่ผู้ใช้เลือก

  const [isOpenButton, setIsOpenButton] = useState(true);
  const { t } = useTranslation();
  const theme = useTheme();
  const [data, setData] = useState({
    category: null,
    header_thumbnail: "",
    sub_header_thumbnail: "",
    date: new Date().toISOString(),
    status: "draft",
  });

  const handleChange = (field) => (event) => {
    setData((prevData) => ({ ...prevData, [field]: event.target.value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSave = async (status) => {
    console.log("user", user);
    try {
      const formData = new FormData();

      // ถ้ามีไฟล์ที่เลือก
      if (selectedFile) {
        formData.append("file", selectedFile); // เพิ่มไฟล์ใน FormData
      }

      // ส่งไฟล์ไปยังเซิร์ฟเวอร์ (อัพโหลดไฟล์)
      const fileUploadResponse = await postImage(
        "database/admin/upload_image.php",
        formData
      );

      if (fileUploadResponse.data.success) {
        console.log("File uploaded successfully!");
        console.log("fileUploadResponse", fileUploadResponse.data);
        const newFilePath = fileUploadResponse.data.filePath.replace(
          /^(\.\.\/)+/,
          ""
        );

        const saveResponse = await postRequest(
          "database/admin/save_content.php",
          {
            ...data,
            category_id: data?.category?.value,
            status,
            created_by: user?.id,
            created_at: new Date().toISOString(),
            image: newFilePath,
          }
        );
        if (saveResponse.data.success) {
          console.log("Content saved successfully!");
        }
      }
    } catch (error) {
      // toast.error("Something went wrong.");
      console.error(error);
    }
  };

  const handleImageUploadtodata = (file) => {
    // console.log(url);
    setSelectedFile(file); // เก็บไฟล์ที่เลือกใน state
  };

  return (
    <>
      <TextHeader title="create_content" />
      <div
        className="container"
        style={{
          width: "80%",
          maxWidth: "1200px",
          height: "auto",
          margin: "auto",
        }}
      >
        {/* ส่วนของ SEO */}
        <SeoSection data={data} setData={setData} handleChange={handleChange} />

        {/* ส่วนของ Thumbnail */}
        <ThumbnailSection
          data={data}
          setData={setData}
          handleChange={handleChange}
          handleImageUploadtodata={handleImageUploadtodata}
        />

        {/* ส่วนของ content */}
        <ContentSection
          data={data}
          setData={setData}
          handleChange={handleChange}
        />

        {/* ส่วนของ button */}

        <Divider>
          <Chip
            label={t("actions")}
            size="large"
            onClick={() => setIsOpenButton((prev) => !prev)}
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
        <div
          style={{
            maxHeight: isOpenButton ? "100px" : "0",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={() => handleSave("draft")}
              sx={{
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {t("save_draft")}
            </Button>

            <Button
              variant="contained"
              color="success"
              startIcon={<Save />}
              onClick={() => handleSave("published")}
              sx={{
                backgroundColor: theme.palette.success.main,
                "&:hover": {
                  backgroundColor: theme.palette.success.dark,
                },
              }}
            >
              {t("save_publish")}
            </Button>

            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              onClick={() => handleSave("deleted")}
              sx={{
                backgroundColor: theme.palette.error.main,
                "&:hover": {
                  backgroundColor: theme.palette.error.dark,
                },
              }}
            >
              {t("deleted_post")}
            </Button>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default CreateContent;
