import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";

const AuthWrapper = () => {
  const location = useLocation(); // current location

  const userLogged = localStorage.getItem("token");
  return userLogged === null ||
    userLogged === "" ||
    userLogged === undefined ||
    userLogged === "null" ||
    userLogged === true ||
    userLogged === "true" ? (
    <Navigate
      key={1}
      to="/login"
      replace
      state={{ from: location }} // <-- pass location in route state
    />
  ) : (
    <Outlet key={3} />
  );
};

export default AuthWrapper;
