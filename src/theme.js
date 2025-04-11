import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#41e0cf",
    },
    secondary: {
      main: "#6b8280",
    },
    text: {
      main: "#105e44",
    },
    background_BoxLogin: {
      main: "rgba(255, 255, 255, 0.6)",
    },
    background_login:
      "linear-gradient(to right, rgb(211, 255, 210), hsl(128, 93.90%, 80.60%))",
  },
  navbar: {
    background: "#fff",
  },
  button: {
    backgroundColor: "#41e0cf",
    textColor: "#105e44",
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#41e0cf",
    },
    secondary: {
      main: "#41e0cf",
    },
    text: {
      main: "#fff",
    },
    background_BoxLogin: {
      main: "rgba(101, 99, 99, 0.6)",
    },
    background_login:
      "linear-gradient(to right, rgb(47, 52, 47), hsl(128, 100.00%, 11.00%))",
  },
  navbar: {
    background: "#000",
  },
  button: {
    backgroundColor: "#13756a",
    textColor: "#fff",
  },
});
