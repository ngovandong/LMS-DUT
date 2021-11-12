import React from "react";
import reactDom from "react-dom";
import App from "./App";
import { RecoilRoot } from "recoil";

reactDom.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
