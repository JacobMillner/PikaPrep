import React  from "react";
import { authService } from "../Services/AuthService";

const LoggedInContext = React.createContext([{}, () => {}]);

const LoggedInProvider = props => {
  const [loggedIn, setLoggedIn] = React.useState(authService.isLoggedIn());
  return (
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      {props.children}
    </LoggedInContext.Provider>
  );
};

export { LoggedInContext, LoggedInProvider };
