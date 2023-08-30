import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import CoinPage from "./Pages/CoinPage";
import NewsPage from "./Pages/NewsPage";
import ExchangesPage from "./Pages/ExchangesPage";
import CoinDetails from "./Components/CoinDetails";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins" element={<CoinPage />} />
        <Route path="/coinDetails/:id" element={<CoinDetails />} />
        <Route path="/exchanges" element={<ExchangesPage />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>
    </>
  );
};

export default App;
