import React, { useState } from "react";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const TableContent = ({ rows, columns, onRowSelectionChange }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const handleCellClick = (params, event) => {
    if (params.field !== "checkboxSelection") {
      event.stopPropagation(); // หยุดการกระทำของการเลือกแถว
    }

    onRowSelectionChange((prevSelectedRows) => {
      if (prevSelectedRows.includes(params.id)) {
        return prevSelectedRows.filter((id) => id !== params.id);
      } else {
        return [...prevSelectedRows, params.id];
      }
    });
  };

  const handlePaginationChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel); // อัปเดตค่า paginationModel

    // ส่งข้อมูล paginationModel ไปที่ parent component
    onRowSelectionChange({
      paginationModel: newPaginationModel, // ส่งข้อมูล paginationModel
      selectedRows: [], // ถ้าต้องการส่งแถวที่เลือกกลับไปด้วย
    });
  };

  return (
    <Paper sx={{ width: "90%", padding: "16px", overflowX: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 20, 30]}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationChange} // ใช้ฟังก์ชันนี้
        checkboxSelection
        disableSelectionOnClick
        onCellClick={handleCellClick}
        sx={{
          height: "550px",
          minHeight: "400px",
          flexGrow: 1,
          border: 0,
        }}
      />
    </Paper>
  );
};

export default TableContent;
