import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Container, Typography, Button } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import MapComponent from "./components/MapComponent";
import Leaderboard from "./components/Leaderboard";
import theme from "./theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 3, color: "#ff9800" }}>
          🌍 E-Waste Recycling Locator
        </Typography>
        <MapComponent />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<LocationOn />}
          sx={{ mt: 2, display: "block", mx: "auto" }}
        >
          Find Nearby Centers
        </Button>
        <Typography variant="h5" sx={{ mt: 3, textAlign: "center", color: "#ff9800" }}>
          🏆 Leaderboard
        </Typography>
        <Leaderboard />
      </Container>
    </ThemeProvider>
  );
}

export default App;
