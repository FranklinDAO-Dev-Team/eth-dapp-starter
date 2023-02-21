import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import { MantineProvider } from "@mantine/core";
import ReactPractice from "./pages/ReactPractice";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withCSSVariables
      theme={{
        headings: {
          sizes: {
            h1: {
              fontSize: 96,
            },
            h2: {
              fontSize: 48,
            },
            h3: {
              fontSize: 32,
            },
          },
        },
      }}
    >
      {/* <ReactPractice /> */}
      <Home />
    </MantineProvider>
  </React.StrictMode>
);
