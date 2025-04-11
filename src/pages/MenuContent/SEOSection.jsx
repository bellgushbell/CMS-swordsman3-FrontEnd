import React, { useState } from "react";
import { Divider, Chip, useTheme, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

const SeoSection = ({ data, handleChange }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* SEO Section */}
      <Divider>
        <Chip
          label={t("create_seo")}
          size="large"
          onClick={() => setIsOpen(!isOpen)} // Toggle div visibility
          sx={{
            color: "white",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            marginBottom: "10px",
          }}
        />
      </Divider>

      {/* SEO Form */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: isOpen ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 0.5s ease-out",
        }}
      >
        <TextField
          label="Title (SEO)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={data.seo_title || ""}
          onChange={handleChange("seo_title")}
        />
        <TextField
          label="Description (SEO)"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={data.seo_description || ""}
          onChange={handleChange("seo_description")}
        />
        <TextField
          label="Keywords (SEO)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={data.seo_keywords || ""}
          onChange={handleChange("seo_keywords")}
        />
      </div>
    </>
  );
};

export default SeoSection;
