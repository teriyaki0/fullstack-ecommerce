import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { Provider } from "react-redux";
import { store } from "./store/store";
const clientId =
  "AcUQZixMcJC_NwkN9S2uMYZsn7r_-ZWmOeexbDmXX5_QFaBk5vkYPAe6JHodWvU1iUt7ukFe3f6vBauj";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </PayPalScriptProvider>
  </Provider>
);
