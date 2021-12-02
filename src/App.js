import React from "react";
import Body from "./style/global.js";
import Navigate from "./Navigate";
import ErrorDialog from "./components/Modal/ErrorDialog.js";

export default function App() {
  return (
    <div>
      <Body /> 
      <ErrorDialog/>
      <Navigate />
    </div>
  );
}
