import React, { useContext, useEffect } from "react";
import { message } from "antd";
import { authService } from "../../Services/AuthService";
import { LoggedInContext } from "../../Context/is-logged-in-context";

const Logout = () => {
  // hacky way to only get the setter
  const [, setLoggedIn] = useContext(LoggedInContext);
  // just logout the user and push back to home
  useEffect(() => {
    authService.logout();
    setLoggedIn(false);
    message.success("Logout Successful!");
  }, [setLoggedIn]);

  return <div>goodbye!</div>;
};

export default Logout;
