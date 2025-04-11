import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // โหลดไฟล์ JSON
  .use(LanguageDetector) // ตรวจจับภาษา
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "th", "zh"], // รองรับภาษาอังกฤษ, ไทย และ จีนย่อ
    fallbackLng: "en", // ใช้ภาษาอังกฤษหากไม่มีข้อมูล
    debug: false, // เปิดการดีบัก

    detection: {
      order: ["localStorage", "navigator"], // ตรวจจับจาก LocalStorage ก่อน
      caches: ["localStorage"], // เก็บค่าภาษาไว้ใน LocalStorage
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
