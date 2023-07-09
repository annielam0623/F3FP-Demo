import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <div className="app text-light">
      <Routes>
        <Route path="/" element={<SearchPage />}></Route>
      </Routes>
    </div>
  );
}
