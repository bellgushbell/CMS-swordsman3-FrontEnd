import React from "react";
import { Box, Button } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Add this import

const TableActions = ({ onAdd, onDelete, disableDelete }) => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleAddPost = () => {
    console.log("add");
    navigate("/content/create"); // Navigate to the desired page
  };

  const handleDeleteClick = () => {
    // onDelete();
    // Additional delete logic, if needed
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
        width: "90%",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAddPost} // Use handleAddClick to navigate
      >
        {t("add")}
      </Button>

      <Button
        variant="contained"
        color="error"
        startIcon={<Delete />}
        onClick={handleDeleteClick}
        disabled={disableDelete}
      >
        {t("delete")}
      </Button>
    </Box>
  );
};

export default TableActions;
