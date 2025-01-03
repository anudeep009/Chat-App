import { Routes, Route } from "react-router-dom";
import Signin from "./components/authentication/Signin.js";
import Signup from "./components/authentication/Signup.js";
import AppRoutes from "./components/routes/AppRoutes.js";
import Layout from "./components/layout/Layout.js";

function App() {
  return (
    <>
    <Routes>
      <Route path="" element={<AppRoutes />}>
        <Route path="/" element={<Layout />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes> 
    </>
  );
}

export default App;