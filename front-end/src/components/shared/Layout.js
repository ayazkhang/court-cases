// src/Layout.js
import React from "react";
import Topbar from "./Topbar";
const Layout = ({ children }) => {
  return (
    <div>
      <Topbar />
      <main style={{ padding: "10px" }}>{children}</main>
    </div>
  );
};

export default Layout;
