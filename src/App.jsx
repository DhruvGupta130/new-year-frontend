import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resolutions from "./components/Resolutions.jsx";
import NewYearWishesForm from "./components/NewYearWishesForm.jsx";
import "../src/App.css"
import HomePage from "./components/HomePage.jsx";
import ResolutionsList from "./components/ResolutionsList.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/resolutions" element={<Resolutions />} />
                <Route path="/n" element={<ResolutionsList />} />
                <Route path="/add-resolution" element={<NewYearWishesForm />} />
            </Routes>
        </Router>
    );
};

export default App;
