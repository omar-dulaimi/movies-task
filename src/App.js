import { BrowserRouter, Route, Routes } from "react-router-dom";
import MoviesList from "./components/MoviesList/MoviesList.lazy";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Movies</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MoviesList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
