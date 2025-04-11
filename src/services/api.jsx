// ฟังก์ชันในการดึงข้อมูลจาก API

import axios from "axios";
const API_SERVICE = import.meta.env.VITE_API_SERVICE;

export const postRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_SERVICE}${endpoint}`, data, {
      withCredentials: true,
    });
    return {
      status: response.status, // status code จาก HTTP response
      data: response.data, // ข้อมูลที่ตอบกลับจาก Backend
    };
  } catch (error) {
    if (error.response) {
      console.error("API request error:", {
        message: error.message,
        status: error.response.status,
        data: error.response.data,
        config: error.config,
      });
    } else {
      console.error("API request error:", error.message);
    }
    throw error;
  }
};

export const postImage = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_SERVICE}${endpoint}`, data, {
      withCredentials: true, // ส่งข้อมูลการยืนยันตัวตน (cookies) หากจำเป็น
      headers: {
        "Content-Type": "multipart/form-data", // กำหนดให้เป็นการส่งไฟล์
      },
    });
    return {
      status: response.status, // status code จาก HTTP response
      data: response.data, // ข้อมูลที่ตอบกลับจาก Backend
    };
  } catch (error) {
    if (error.response) {
      console.error("API request error:", {
        message: error.message,
        status: error.response.status,
        data: error.response.data,
        config: error.config,
      });
    } else {
      console.error("API request error:", error.message);
    }
    throw error;
  }
};

// ฟังก์ชัน GET
export const getRequest = async (endpoint, id) => {
  try {
    let url = `${API_SERVICE}${endpoint}`;
    // ถ้ามี id ให้ดึงข้อมูลเฉพาะของไอดี
    if (id) {
      url += `/${id}`;
    }
    const response = await axios.get(url);
    return {
      status: response.status, // status code จาก HTTP response
      data: response.data, // ข้อมูลที่ตอบกลับจาก Backend
    };
  } catch (error) {
    if (error.response) {
      console.error("API request error:", {
        message: error.message,
        status: error.response.status,
        data: error.response.data,
        config: error.config,
      });
    } else {
      console.error("API request error:", error.message);
    }
    throw error;
  }
};

// ฟังก์ชัน DELETE
export const deleteRequest = async (endpoint, id) => {
  try {
    const response = await axios.delete(`${API_SERVICE}${endpoint}`, id);
    return {
      status: response.status, // status code จาก HTTP response
      data: response.data, // ข้อมูลที่ตอบกลับจาก Backend
    };
  } catch (error) {
    if (error.response) {
      console.error("API request error:", {
        message: error.message,
        status: error.response.status,
        data: error.response.data,
        config: error.config,
      });
    } else {
      console.error("API request error:", error.message);
    }
    throw error;
  }
};

// ฟังก์ชัน PATCH หรือ PUT สำหรับการแก้ไขข้อมูล
export const updateRequest = async (endpoint, id, data) => {
  try {
    const response = await axios.patch(`${API_SERVICE}${endpoint}/${id}`, data);
    return {
      status: response.status, // status code จาก HTTP response
      data: response.data, // ข้อมูลที่ตอบกลับจาก Backend
    };
  } catch (error) {
    if (error.response) {
      console.error("API request error:", {
        message: error.message,
        status: error.response.status,
        data: error.response.data,
        config: error.config,
      });
    } else {
      console.error("API request error:", error.message);
    }
    throw error;
  }
};
