import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Detail from "./components/Detail";
import Login from "./components/Login";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "./firebase";
import { useDispatch } from "react-redux";
import { setMovies } from "./features/movie/movieSlice";

function App() {
  const dispatch = useDispatch();
  const [movieSnapshot] = useCollection(db.collection("movies"));
  console.log(movieSnapshot);

  useEffect(() => {
    let temp = movieSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    dispatch(setMovies(temp));
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/detail">
            <Detail />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
