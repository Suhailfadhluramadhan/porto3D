import AnimationPage from "./3Dpage/AnimationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HomePage from "./Home/HomePage.jsx";




function About() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-3xl font-bold underline">About Page</h1>;
      <button onClick={() => navigate("/")}>Go to Root</button>
    </>
  );
}

function Project() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-3xl font-bold underline">About project</h1>;
      <button onClick={() => navigate("/")}>Go to Root</button>
    </>
  );
}

function Kontak() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-3xl font-bold underline">About kontak</h1>;
      <button onClick={() => navigate("/")}>Go to Root</button>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnimationPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/kontak" element={<Kontak />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;