import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { Home, People, Logout } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

import FeedIcon from "@mui/icons-material/Feed";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import CollectionsIcon from "@mui/icons-material/Collections";

const drawerWidth = 240;
const collapsedWidth = 80;

const Navbar = ({ isVisible }) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  const menuItems = [
    // { text: "Dashboard", path: "/Dashboard", icon: <Home /> },
    { text: "การจัดการเนื้อหา", path: "/content", icon: <FeedIcon /> },
    // { text: "SEO", path: "/seo", icon: <FindInPageIcon /> },
    { text: "จัดการผู้ใช้", path: "/user", icon: <People /> },
    // { text: "แกลเลอรี่", path: "/gallery", icon: <CollectionsIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isVisible ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isVisible ? drawerWidth : collapsedWidth,
          transition: "width 0.3s",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 1,
          position: "relative", // ทำให้มันอยู่ในตำแหน่งธรรมดา
        },
      }}
    >
      {/* เมนูหลัก */}
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton key={index} component={"a"} href={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {isVisible && <ListItemText primary={item.text} />}
          </ListItemButton>
        ))}
      </List>

      <Box>
        <ListItemButton>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          {isVisible && <ListItemText primary={t("Logout")} />}
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Navbar;
