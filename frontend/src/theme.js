import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976D2" }, // Blue
    secondary: { main: "#FF4081" }, // Pink
    background: { default: "#E3F2FD", paper: "#FFFFFF" }, // Soft Blue & White
    text: { primary: "#212121", secondary: "#757575" }, // Dark Gray & Light Gray
  },
});

export default theme;
// AIzaSyAFWX6nuZwBs9qor8MrXZDXl8ZFyAc7TOk