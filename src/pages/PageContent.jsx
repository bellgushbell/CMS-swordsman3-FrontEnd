import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableActions from "../components/TableActions";
import TableContent from "../components/TableContent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextHeader from "../components/TextHeader";
import { postRequest } from "../services/api";
import { useNavigate } from "react-router-dom";

export const PageContent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const columns = [
    { field: "id", headerName: "No.", sortable: true, flex: 1 },
    // {
    //   field: "image",
    //   headerName: "Image",
    //   flex: 1.5,
    //   renderCell: (params) => (
    //     <img
    //       src={params.value}
    //       alt="Thumbnail"
    //       style={{ width: 50, height: 50, borderRadius: 5 }}
    //     />
    //   ),
    // },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "headline", headerName: "Headline", flex: 1, editable: true },
    { field: "date", headerName: "Create", flex: 1 },
    { field: "dateEdit", headerName: "Edit", flex: 1 },
    { field: "author", headerName: "Author", flex: 1 },
    { field: "editor", headerName: "Editor", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const statusColor = params.value === "published" ? "green" : "gray";
        return (
          <span style={{ color: statusColor, fontWeight: "bold" }}>
            {params.value}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          <IconButton
            onClick={() => navigate(`/content/edit/${params.row.id}`)} // เปลี่ยน id ตรงนี้ให้ตรงกับชื่อฟิลด์จริง
            className="icon-button"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => console.log("View clicked", params.row)}
            className="icon-button"
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            onClick={() => console.log("Delete clicked", params.row)}
            className="icon-button"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  // ฟังก์ชันเพิ่มข้อมูลใหม่
  const handleAdd = () => {
    const newId = data.length ? data[data.length - 1].id + 1 : 1;
    const newRow = { id: newId, name: "New User", age: 0, country: "Unknown" };
    setData([...data, newRow]);
  };

  // ฟังก์ชันลบข้อมูลที่เลือก
  const handleDelete = () => {
    setData(data.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]); // เคลียร์การเลือก
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await postRequest("database/admin/content_read.php", {
          category: "ALL",
          page: paginationModel.page + 1, // เพิ่ม 1 เพื่อให้เริ่มจากหน้า 1
          pageSize: paginationModel.pageSize,
          language: localStorage?.lang,
        }); // Requesting all resources

        // console.log(response.data.data); // Log the response data

        setData(
          response.data.data.map((item) => ({
            id: item.id,
            // image: item.image,
            category: item.category_name,
            headline: item.header_thumbnail,
            date: new Date(item.created_at).toLocaleDateString("th-TH"),
            author: item.created_by,
            editor: item.updated_by,
            dateEdit: new Date(item.updated_at).toLocaleDateString("th-TH"),
            status: item.status,
          }))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [paginationModel, localStorage?.lang]); // อัปเดตข้อมูลเมื่อ paginationModel เปลี่ยนแปลง

  // ฟังก์ชันที่จะรับค่าจาก TableContent
  const handleRowSelectionChange = (selectionData) => {
    if (selectionData.paginationModel) {
      setPaginationModel(selectionData.paginationModel); // อัปเดต paginationModel
    }
    if (selectionData.selectedRows) {
      setSelectedRows(selectionData.selectedRows); // อัปเดตแถวที่เลือก
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        padding: "20px",
        width: "100%",
      }}
    >
      <TextHeader title="content_management" />
      <TableActions
        onAdd={handleAdd}
        onDelete={handleDelete}
        disableDelete={selectedRows.length === 0}
      />
      <TableContent
        rows={data}
        columns={columns}
        onRowSelectionChange={handleRowSelectionChange} // ส่งฟังก์ชันนี้ไปที่ TableContent
      />
    </Box>
  );
};

export default PageContent;
