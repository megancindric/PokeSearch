import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  const Pokedex = require("pokeapi-js-wrapper");
  const P = new Pokedex.Pokedex();
  return (
    <div className="App custom_font">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage Dex={P} />} />
        <Route path="/details/:pokeName" element={<DetailsPage Dex={P} />} />
      </Routes>
    </div>
  );
}

export default App;
