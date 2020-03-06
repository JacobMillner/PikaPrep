import React from "react";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import MainNavBar from "./Components/MainNavBar/MainNavBar";
import Splash from "./Components/Splash/Splash";
import Users from "./Components/Users/Users";
import User from "./Components/Users/User";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout/Logout";
import Signup from "./Components/Signup/Signup";
import NewMeal from "./Components/Meals/NewMeal";
import PrepCalendar from "./Components/PrepCalendar/PrepCalendar";
import Meal from "./Components/Meals/Meal";
import Meals from "./Components/Meals/Meals";
import PlanMeal from "./Components/PlanMeal/PlanMeal";
import { Layout } from "antd";
import { LoggedInProvider } from "./Context/is-logged-in-context";

const store = createStore(
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtensions() : f => f
  )
);

function App() {
  const { Header, Content, Footer } = Layout;
  return (
    <Provider store={store}>
      <LoggedInProvider>
        <div>
          <Layout style={{ minHeight: "100vh" }}>
            <MainNavBar />
            <Layout>
              <Header style={{ background: "#fff", padding: 0 }} />
              <Content style={{ margin: "0 0px" }}>
                <Route exact path="/" component={Splash} />
                <Route exact path="/login/" component={Login} />
                <Route exact path="/logout/" component={Logout} />
                <Route exact path="/signup/" component={Signup} />
                <Route exact path="/users/" component={Users} />
                <Route exact path="/user/:id" component={User} />
                <Route exact path="/meals/" component={Meals} />
                <Route exact path="/meals/:id(\d+)" component={Meal} />
                <Route exact path="/planmeal/:id(\d+)" component={PlanMeal} />
                <Route exact path="/meals/new" component={NewMeal} />
                <Route exact path="/calendar/" component={PrepCalendar} />
                <Route exact path="/calendar/:id(\d+)" component={PrepCalendar} />
              </Content>
              <Footer style={{ textAlign: "center" }}>
                Jacob Millner ©2020
              </Footer>
            </Layout>
          </Layout>
        </div>
      </LoggedInProvider>
    </Provider>
  );
}

export default App;
