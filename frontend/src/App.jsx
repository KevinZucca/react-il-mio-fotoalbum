import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/guest/HomePage";
import About from "./pages/guest/About";
import { PhotosProvider } from "./contexts/PhotosContext";

export default function App() {
  return (
    <Router>
      <PhotosProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Route>
        </Routes>
      </PhotosProvider>
    </Router>
  );
}
