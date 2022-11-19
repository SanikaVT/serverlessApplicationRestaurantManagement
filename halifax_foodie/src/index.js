import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";

import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import LexChat from "react-lex";

Amplify.configure(config);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
ReactDOM.render(
  <React.StrictMode>
    <App />
    <LexChat
      botName="HalifaxFoodie"
      IdentityPoolId="us-east-1:1c14fb01-663e-45b0-a5fd-26ad6e14b8cc"
      placeholder="Placeholder text"
      backgroundColor="#FFFFFF"
      height="430px"
      region="us-east-1"
      headerText="Chat with me"
      headerStyle={{ backgroundColor: "#ABD5D9", fontSize: "30px" }}
      greeting={
        "Hello, how can I help? You can say things like 'help' to get more info"
      }
    />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
