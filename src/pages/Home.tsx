function Home() {
  return (
    <div className="home-wrapper">
      <img className="home-img" src="/lunch.png" alt="lunch" />
      <h1>Find your next meal</h1>
      <p>
        Create a session, share the link, and swipe through restaurants with
        friends
      </p>

      <div className="btn-wrapper">
        <button className="btn primary">Start New Session</button>
        <button className="btn secondary">Join with Code</button>
      </div>
    </div>
  );
}

export default Home;
