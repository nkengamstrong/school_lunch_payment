import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, BrowserRouter, Routes, useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import ParentHomeScreen from "./components/ParentHomeScreen";
import StudentBalance from "./components/StudentBalance";
import AddStudent from "./components/AddStudent";
import { checkAuthentication } from "./components/Auth";
import Makepayment from "./components/Makepayment";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");

  useEffect(() => {
    const authenticate = async () => {
      const authData = await checkAuthentication();
      setIsAuthenticated(authData.isAuthenticated);
      setName(authData.name);
      setParentId(authData.parentId);
      console.log("App ParentId ", authData);
    };

    authenticate();
  }, []);

  const handleLogin = (navigate) => {
    setIsAuthenticated(true);
    navigate("/home");
  };

  const handleLogout = (navigate) => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Nav
          isAuthenticated={isAuthenticated}
          name={name}
          onLogout={handleLogout}
        />
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<ParentHomeScreen />} />
              <Route
                path="/home"
                element={<ParentHomeScreen parent_id={parentId} />}
              />
              <Route
                path="/balance"
                element={<StudentBalance parent_id={parentId} />}
              />
              <Route
                path="/add-student"
                element={<AddStudent parent_id={parentId} />}
              />
              <Route
                path="/make-payment"
                element={<Makepayment parent_id={parentId} />}
              />
            </>
          ) : (
            <>
              <Route path="/" element={<Login onLogin={handleLogin} />} />
              <Route path="/sign-up" element={<Signup />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
