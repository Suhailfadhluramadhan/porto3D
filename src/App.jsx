import { useEffect, createContext } from "react";
import AnimationPage from "./3Dpage/AnimationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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

export const Darkmode = createContext(null);

function App() {
  const [toggle, setToggle] = useState(() => {
    return JSON.parse(localStorage.getItem("myToggle")) ?? false;
  });

  useEffect(() => {
    localStorage.setItem("myToggle", JSON.stringify(toggle));
    console.log(toggle);
  }, [toggle]);

  return (
    <Darkmode.Provider value={{ toggle, setToggle }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimationPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/kontak" element={<Kontak />} />
        </Routes>
      </BrowserRouter>
    </Darkmode.Provider>
  );
}

export default App;
