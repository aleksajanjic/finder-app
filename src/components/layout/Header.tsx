function Header() {
  return (
    <div className="header-wrapper">
      <div className="logo-wrapper">
        <img className="header-img" src="/burger.png" alt="icon" />
        <p className="header-title">Finder</p>
      </div>
      <p className="session-info">Session: abc123</p>
    </div>
  );
}

export default Header;
