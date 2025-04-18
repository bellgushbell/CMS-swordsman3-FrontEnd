gamecms/ # Root ของโปรเจค
│
├── public/ # ไฟล์ static (favicon, logo, etc.)
│ └── locales/ # ไฟล์ภาษา (EN/TH)
│ ├── en/
│ │ └── translation.json
│ └── th/
│ └── translation.json
│
├── src/ # Source code หลัก
│ ├── assets/ # ไฟล์รูปภาพ, icons, styles
│ ├── components/ # ส่วนประกอบ UI (ปุ่ม, การ์ด, ฟอร์ม ฯลฯ)
│ │ ├── ThemeToggle.js # ปุ่มสำหรับเปลี่ยนธีม
│ │ └── LanguageSwitcher.js # ปุ่มสำหรับเปลี่ยนภาษา
│ ├── context/ # React Context API สำหรับ Theme, Auth, Language
│ │ ├── ThemeContext.js # การจัดการธีม (Dark/Light Mode)
│ │ ├── AuthContext.js # การจัดการ Authentication
│ │ └── LanguageContext.js # การจัดการภาษา (EN/TH)
│ ├── hooks/ # Custom hooks ต่างๆ
│ ├── i18n.js # การตั้งค่า i18next สำหรับการแปลภาษา
│ ├── layouts/ # Layout หลัก (Sidebar, Header, Footer)
│ │ └── MainLayout.js # เลย์เอาต์หลักของหน้า
│ ├── pages/ # ไฟล์ของแต่ละหน้า
│ │ ├── Dashboard.js # หน้า Dashboard
│ │ ├── News.js # หน้า จัดการข่าว
│ │ ├── Events.js # หน้า จัดการกิจกรรม
│ │ ├── Promotions.js # หน้า จัดการโปรโมชั่น
│ │ └── Login.js # หน้า Login
│ ├── services/ # ฟังก์ชันเรียก API (Axios)
│ │ └── api.js # ตั้งค่าการเรียก API ด้วย Axios
│ ├── App.jsx # ไฟล์หลักของ React
│ ├── index.js # จุดเริ่มต้นของ React
│
├── package.json # ไฟล์ dependencies
├── yarn.lock # ไฟล์ที่ถูกสร้างโดย Yarn
└── README.md # คำอธิบายโปรเจค
#   C M S - s w o r d s m a n 3 - F r o n t E n d  
 