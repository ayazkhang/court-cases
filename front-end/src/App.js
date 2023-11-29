import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import CasesAddOrEdit from "./components/CasesAddOrEdit";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CasesAddOrEdit />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
