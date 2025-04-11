import React, { createContext, useState, useMemo } from "react";
import i18n from "../i18n"; // ใช้ i18n สำหรับการแปลภาษา

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // ค่าเริ่มต้นเป็นภาษาอังกฤษ

  const changeLanguage = (newLanguage) => {
    i18n.changeLanguage(newLanguage); // ใช้ i18n เพื่อเปลี่ยนภาษา
    setLanguage(newLanguage); // อัพเดตภาษาใน Context
  };

  const value = useMemo(
    () => ({ language, setLanguage: changeLanguage }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
