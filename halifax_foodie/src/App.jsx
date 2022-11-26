import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Order from "./components/order/orderPage";
import RealTimeChat from './components/real-time-chat/RealTimeChat';
import RecipeUpload from "./components/recipeUpload/RecipeUpload";
import giveRating from "./components/review/giveRating";

import { useHistory } from 'react-router-dom';

import { withAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import "../src/main.css";
import './App.css';
import MultiFactor from "./components/mfa/Mfa";

function App() {
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    window.location.reload();
    history.push("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="app">

      {/* {//references: */}
      {/* //https://mui.com/material-ui/react-app-bar/} */}

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Halifax Foodie
          </Typography>
          <Button color="inherit" onClick={() => logout()}>Logout</Button>
        </Toolbar>
      </AppBar>

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
    </Box>

  );
}
// export default App;

export default withAuthenticator(App);
