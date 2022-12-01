import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import LexChat from "react-lex";

//https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/#option-1-use-pre-built-ui-components
Amplify.configure(config);
// Reference: https://www.npmjs.com/package/react-lex-plus
ReactDOM.render(
  <React.StrictMode>
    <App />
    {JSON.parse(localStorage.getItem("isChat")) == false ? (
      <LexChat
        botName="myBot"
        IdentityPoolId="us-east-1:eceae3ad-6ac0-4b26-8bd4-37146d11c9d0"
        placeholder="Placeholder text"
        backgroundColor="#FFFFFF"
        height={430}
        region="us-east-1"
        headerText="HalifaxFoodie Bot"
        headerStyle={{ backgroundColor: "#ABD5D9", fontSize: "30px" }}
        greeting={"Hello, how can I help you?"}
      />
    ) : (
      <div></div>
    )}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
