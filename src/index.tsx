import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./reset.css";
import "./global.css";
import { mockTransactions } from "./store/mockData";
import AppState from "./store/AppState";

export const appState = new AppState(mockTransactions);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App appState={appState} />
  </React.StrictMode>
);
