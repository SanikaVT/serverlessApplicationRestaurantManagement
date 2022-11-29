import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Order from "./components/order/orderPage";
import RealTimeChat from './components/real-time-chat/RealTimeChat';
import RecipeUpload from "./components/recipeUpload/RecipeUpload";
import giveRating from "./components/review/giveRating";

import { useHistory } from 'react-router-dom';
import LexChat from "react-lex";

import { withAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import "../src/main.css";
import './App.css';
import MultiFactor from "./components/mfa/Mfa";
import Visualization from "./components/visualization/Visualization";

function App() {
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    window.location.reload();
    history.push("/");
    
  };
  const home= () => {
    history.push("/");
    window.location.reload();

  };
  let isQuestion = !!JSON.parse(localStorage.getItem("IsQuestion"))

  return (
    <Box sx={{ flexGrow: 1 }} className="app">

      {/* {//references: */}
      {/* //https://mui.com/material-ui/react-app-bar/} */}

      <AppBar position="static">
        <Toolbar>
          <IconButton
          onClick={() => home()}
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

      {!isQuestion ? (
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
            <Route exact path="/visualization" component={Visualization} />
          </Switch>
        </Router>
      )}
  {
    
    <LexChat
      botName="myBot"
      IdentityPoolId="us-east-1:eceae3ad-6ac0-4b26-8bd4-37146d11c9d0"
      placeholder="Placeholder text"
      backgroundColor="#FFFFFF"
      height={430}
      region="us-east-1"
      headerText="HalifaxFoodie Bot"
      headerStyle={{ backgroundColor: "#ABD5D9", fontSize: "30px" }}
      greeting={
        "Hello, how can I help? You can say things like 'help' to get more info"
      }
    />
  }
    </Box>

  );
}
// export default App;

export default withAuthenticator(App);
