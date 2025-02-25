import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const onAboutClickBtn = () => {
    navigate("/about");
  };

  const onBackBtn = () => {
    navigate(-1);
  };
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button onClick={onAboutClickBtn}>About</button>
        </li>
        <li>
          <button onClick={onBackBtn}>Back</button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
