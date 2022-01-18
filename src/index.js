import React from "react";
import reactDom from "react-dom";
import App from "./App";
import { RecoilRoot } from "recoil";
import { HashRouter } from "react-router-dom";
reactDom.render(
  <React.StrictMode>
    <HashRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
