import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import createRoutes from "./routes/routes";

import useDarkTheme from "./components/useDarkTheme";
import { lightTheme, darkTheme } from "./components/theme";
import { GlobalStyles } from "./components/GlobalStyles";
import { ToastContainer, Slide } from "react-toastify";
import Layout from "./components/layouts/Layout";

const App = () => {
  const routes = createRoutes();

  const [theme, themeToggler] = useDarkTheme();
  const selectedTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyles />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
      <Layout themeMode={theme} themeToggler={themeToggler}>
        {routes}
      </Layout>
    </ThemeProvider>
  );
};
export default App;
