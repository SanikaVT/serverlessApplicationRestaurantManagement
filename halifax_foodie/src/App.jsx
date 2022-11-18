import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RealTimeChat from './components/real-time-chat/RealTimeChat'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Order from "./components/orderPage";
import giveRating from "./components/giveRating";
import RecipeUpload from "./components/RecipeUpload";
// import UserPool from './UserPool'

import { withAuthenticator } from "@aws-amplify/ui-react";
import "../src/main.css";
import Question from "./components/Question";
import './App.css'


function App() {
  return (
    // <div className="App">
    <>
      {/* <Router>
        <Routes>
          
        </Routes>
      </Router> */}


      {!JSON.parse(localStorage.getItem("IsQuestion")) ? (
        <Router>
          <Switch>
            <Route exact path="/" component={Question} />
            {/* <Route exact path="/dashboard" component={Dashboard} /> */}
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>       
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/question" component={Question} />
            <Route exact path="/giveratings" component={giveRating} />
            <Route exact path="/chat" component={RealTimeChat} />
            <Route exact path="/order" component={Order} />
            <Route exact path="/recipeupload" component={RecipeUpload} />

          </Switch>
        </Router>
      )}
    {/* </div> */}
    </>
  );
}
// export default App;

export default withAuthenticator(App);
