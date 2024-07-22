import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    cordova: boolean;
  }
}

const renderReactDom = () => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

if (window.cordova) {
  document.addEventListener(
    "deviceready",
    () => {
      console.log("DEBUG: triggered dom render");
      renderReactDom();
      console.log(
        "DEBUG:",
        document.getElementById("root"),
        ReactDOM.createRoot
      );
    },
    false
  );
} else {
  renderReactDom();
}
