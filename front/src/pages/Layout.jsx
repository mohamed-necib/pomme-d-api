import { Outlet, Link } from "react-router-dom";
// outlet permet de render la page sélectionnée
// link permet de naviguer entre les pages

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/authentication">Register/connection</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
