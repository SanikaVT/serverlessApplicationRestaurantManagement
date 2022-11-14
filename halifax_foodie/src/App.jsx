import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/signin";
import USignUp from "./components/signup/SignUp";
import RealTimeChat from './components/real-time-chat/RealTimeChat'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Signup from "./components/Signup";
import Dashboard from "./Dashboard";
import Order from "./components/orderPage";
import giveRating from "./components/giveRating";
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


      {console.log(">>>", JSON.parse(localStorage.getItem("IsQuestion")))}
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
          {/* <Route path="/signup" element={<USignUp />}></Route>
          <Route path="/" element={<SignIn />}></Route> */}
          {/* <Route path="/chat" element={<RealTimeChat />}></Route> */}
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/question" component={Question} />
            <Route exact path="/giveratings" component={giveRating} />
            <Route exact path="/chat" component={RealTimeChat} />
            <Route exact path="/order" component={Order} />
          </Switch>
        </Router>
      )}
    {/* </div> */}
    </>
  );
}
// export default App;

export default withAuthenticator(App);

