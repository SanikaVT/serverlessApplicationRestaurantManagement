import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RealTimeChat from './components/real-time-chat/RealTimeChat'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Order from "./components/order/orderPage";
import giveRating from "./components/review/giveRating";
import RecipeUpload from "./components/recipeUpload/RecipeUpload";
// import UserPool from './UserPool'


import { withAuthenticator } from "@aws-amplify/ui-react";
import "../src/main.css";
import MultiFactor from "./components/mfa/Mfa";
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
            <Route exact path="/" component={MultiFactor} />
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>       
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/question" component={MultiFactor} />
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
