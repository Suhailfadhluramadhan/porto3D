import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-3xl font-bold underline">About Page</h1>;
      <button onClick={() => navigate("/")}>Go to Root</button>
    </>
  );
}

export default About;
