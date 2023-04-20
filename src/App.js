import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import SearchPage from './pages/SearchPage/SearchPage';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/details/:pokeName" element={<DetailsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
