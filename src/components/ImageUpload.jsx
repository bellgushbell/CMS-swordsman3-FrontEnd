// ImageUpload.js
import React, { useState } from "react";
import { Button } from "@mui/material";

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onImageUpload(reader.result); // ส่ง URL ของภาพกลับไปที่ parent component
      };
      reader.readAsDataURL(file); // อ่านไฟล์เป็น Base64
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>
      {image && (
        <img
          src={image}
          alt="Thumbnail"
          style={{ marginTop: 10, maxWidth: "100%" }}
        />
      )}
    </div>
  );
};

export default ImageUpload;
