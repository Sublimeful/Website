import "./NavBar.css"

export default function NavBar() {

  function dropdownMouseOver(el) {
    const dropdownContent = el.querySelector(".dropdown-content");
    dropdownContent.style.visible = true;
    
  }

  return (
    <header className="navbar">
      <a href="#" className="logo">Logo</a>
      <nav className="nav-links">
        <ul>
          <li><a href="#">Home</a></li>
          <li className="dropdown" onMouseEnter={dropdownMouseOver}>
            <a href="#">My Projects</a>
            <ul className="dropdown-content">
              <li><a href="#">History</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </li>
          <li><a href="#">About</a></li>
        </ul>
      </nav>
    </header>
  );
}


