import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextHeader from "../../components/TextHeader";
import ThumbnailSection from "./ThumbnailSection";
import SeoSection from "./SEOSection";
import ContentSection from "./ContentSection";
import { Button, Chip, Divider, Stack, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Delete, Save } from "@mui/icons-material";
import { postImage, postRequest, getRequest } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export const EditContent = () => {
  const { id } = useParams(); // ดึงพารามิเตอร์จาก URL เช่น /edit/123
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const numericId = parseInt(id, 10);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpenButton, setIsOpenButton] = useState(true);
  const [data, setData] = useState({});

  // console.log(id);

  // 📥 Load content by ID
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await postRequest(`database/admin/get_content.php`, {
            id: numericId,
            language: localStorage.getItem("i18nextLng"),
          });
          if (response?.data?.success) {
            const content = response.data.content;
            setData({
              seo_title: content.seo_title || "",
              seo_description: content.seo_description || "",
              seo_keywords: content.seo_keywords || "",
              header_thumbnail: content.header_thumbnail || "",
              sub_header_thumbnail: content.sub_header_thumbnail || "",
              date: content.date || new Date().toISOString(),
              category: {
                value: content.category_id,
                label: content.category_name,
              },
              image:
                "http://dev.stationidea.com/images/thumbnail/" +
                  content.image || "",
            });
          }
        } catch (error) {
          console.error("Error loading content:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleChange = (field) => (event) => {
    setData((prevData) => ({ ...prevData, [field]: event.target.value }));
  };

  const handleSave = async (status) => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
        const fileUploadResponse = await postImage(
          "database/admin/upload_image.php",
          formData
        );
        if (fileUploadResponse.data.success) {
          console.log("File uploaded successfully!");
        }
      }

      const saveResponse = await postRequest(
        "database/admin/save_content.php",
        {
          ...data,
          category_id: data?.category?.value,
          status,
          id, // ใส่ id เข้าไปเพื่อแก้ไขแทนที่จะสร้างใหม่
          updated_by: user?.id,
          updated_at: new Date().toISOString(),
        }
      );

      if (saveResponse.data.success) {
        console.log("Content updated successfully!");
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const handleImageUploadtodata = (file) => {
    setSelectedFile(file);
  };

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <>
      <TextHeader title="edit_content" />
      <div
        className="container"
        style={{
          width: "80%",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <SeoSection data={data} setData={setData} handleChange={handleChange} />
        <ThumbnailSection
          data={data}
          setData={setData}
          handleChange={handleChange}
          handleImageUploadtodata={handleImageUploadtodata}
        />
        <ContentSection
          data={data}
          setData={setData}
          handleChange={handleChange}
        />
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
            >
              {t("save_draft")}
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<Save />}
              onClick={() => handleSave("published")}
            >
              {t("save_publish")}
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              onClick={() => handleSave("deleted")}
            >
              {t("deleted_post")}
            </Button>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default EditContent;
