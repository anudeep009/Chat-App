import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
//@ts-ignore
import Signin from "./components/authentication/Signin.js";
//@ts-ignore
import Signup from "./components/authentication/Signup.js";

function App() {
  return (
    <>
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes> 
    </>
  );
}

export default App;