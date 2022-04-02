import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import apiClient from "./apiClient";
import MoviesList from "./components/MoviesList/MoviesList.lazy";
import MovieDetails from "./components/MovieDetails/MovieDetails.lazy";
import Header from "./components/Header/Header.lazy";
import "./App.css";

function App() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [moviesData, setMoviesData] = useState(null);
  const [filteredMoviesData, setFilteredMoviesData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingState, setLoadingState] = useState({
    type: "default",
    message: "",
  });

  const getMovies = () => {
    setLoadingState({ type: "fetching" });
    apiClient
      .get("/popular", {
        params: {
          page: currentPage,
        },
      })
      .then((response) => {
        setMoviesData(response?.data?.data);
        setFilteredMoviesData(response?.data?.data);
        setLoadingState({ type: "success" });
      })
      .catch((error) => {
        setLoadingState({ type: "error", message: error.message });
      });
  };

  useEffect(() => {
    getMovies();
    return () => {};
  }, []);

  useEffect(() => {
    if (moviesData) {
      setMoviesData({
        ...moviesData,
        results: filteredMoviesData.results.filter(
          (result) =>
            new Date(result["release_date"]).getFullYear() === selectedYear
        ),
      });
    }
    return () => {};
  }, [selectedYear]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          currentYear={currentYear}
        />
        <Routes>
          <Route
            path="/"
            element={
              <MoviesList
                moviesData={moviesData}
                loadingState={loadingState}
                setCurrentPage={setCurrentPage}
              />
            }
          />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
