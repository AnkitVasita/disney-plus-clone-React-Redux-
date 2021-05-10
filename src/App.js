import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Detail from "./components/Detail";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import { selectUser } from "./features/user/userSlice";

function App() {
  const user = useSelector(selectUser);

  return (
    <div className="App">
      <Router>
        <Header />

        {!user ? (
          <Login />
        ) : (
          <>
            <Switch>
              <Route exact path="/login"></Route>
              <Route exact path="/detail/:id">
                <Detail />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
