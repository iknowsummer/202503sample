import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerList from "./CustomerList";
import CustomerDetail from "./CustomerDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/customer/" element={<CustomerList />} />
        <Route path="/customer/:id" element={<CustomerDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
