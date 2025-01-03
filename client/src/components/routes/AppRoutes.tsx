import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

function AppRoutes() {
  return (
    <>
      <Header onMenuClick={() => console.log("Menu clicked")} />
        <Outlet />
      <Footer />
    </>
  );
}

export default AppRoutes;