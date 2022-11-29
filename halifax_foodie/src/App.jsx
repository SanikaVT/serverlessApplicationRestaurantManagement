import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Order from "./components/order/orderPage";
import RealTimeChat from './components/real-time-chat/RealTimeChat';
import RecipeUpload from "./components/recipeUpload/RecipeUpload";
import giveRating from "./components/review/giveRating";

import { withAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import "../src/main.css";
import './App.scss';
import MultiFactor from "./components/mfa/Mfa";
import Visualization from "./components/visualization/Visualization";

function App() {

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  let isQuestion = !!JSON.parse(localStorage.getItem("IsQuestion"))

  return (
    <Box sx={{ flexGrow: 1 }} className="app">

      {/* {//references: */}
      {/* //https://mui.com/material-ui/react-app-bar/} */}
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <NavLink style={{textDecoration: 'none', color: 'white', cursor: 'pointer'}} to={'/'}> Halifax Foodie</NavLink>
              </Typography>
              <Button color="inherit" onClick={() => logout()}>Logout</Button>
            </Toolbar>
          </AppBar>
          {
            isQuestion ?
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/question" component={MultiFactor} />
                <Route exact path="/giveratings" component={giveRating} />
                <Route exact path="/chat" component={RealTimeChat} />
                <Route exact path="/order" component={Order} />
                <Route exact path="/recipeupload" component={RecipeUpload} />
                <Route exact path="/visualization" component={Visualization} />
            </Switch>
            :
            <Switch>
              <Route exact path="/" component={MultiFactor} />
            </Switch>
          }
        </Router>
    </Box>

  );
}
// export default App;

export default withAuthenticator(App);
