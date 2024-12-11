import { Outlet } from "react-router-dom";
import Header from "../layout/Header";

function AppRoutes() {
  return (
    <>
      <Header onMenuClick={() => console.log("Menu clicked")} />
        <Outlet />
    </>
  );
}

export default AppRoutes;