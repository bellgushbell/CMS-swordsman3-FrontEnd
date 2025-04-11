import React, { createContext, useState } from "react";

// สร้าง Context สำหรับการจัดการการเข้าสู่ระบบ
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user state สำหรับเก็บข้อมูลผู้ใช้

  const login = (username) => {
    setUser(username); // ตั้งค่า user เมื่อเข้าสู่ระบบสำเร็จ
  };

  const logout = () => {
    setUser(null); // ลบข้อมูลผู้ใช้เมื่อออกจากระบบ
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
