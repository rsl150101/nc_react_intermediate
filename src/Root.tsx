import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function Root() {
  return (
    <div>
      <Header />
      <Outlet context={{ darkMode: "false" }} />
    </div>
  );
}

export default Root;
