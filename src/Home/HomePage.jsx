function HomePage() {
  return (
    <div>
      <h1 class="text-3xl font-bold underline">Home</h1>
      <button onClick={() => navigate("/")}>Go to Root</button>
    </div>
  );
}

export default HomePage;
