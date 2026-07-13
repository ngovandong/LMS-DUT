import React from "react";
import Body from "./style/global.js";
import Navigate from "./Navigate";
import ErrorDialog from "./components/Modal/ErrorDialog.js";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./style/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Body /> 
      <ErrorDialog/>
      <Navigate />
    </ThemeProvider>
  );
}
