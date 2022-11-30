import { Card, Grid } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Plot from 'react-plotly.js';


import './Dashboard.scss';
//Dashboard contains all the buttons visualization, Uplaod Recipe, Order Food etc
export default function Dashboard() {
  const role = localStorage.getItem("Role");
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);
  const[positive,setPositive]=useState(0);
  const[negative,setNegative]=useState(0);
  const[neutral,setNeutral]=useState(0);
  const[polarity,setPolarity]=useState("");

  useEffect(() => {
    getCurrentUser();
  }, []);
//function to get Polarity
async function getPolarity(){
  var posCount=0;
  var negCount=0;
  var neutCount=0;
  //Reference: https://axios-http.com/docs/post_example
  await axios
  .post(
    "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/polarity",

    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    }
  )
  .then((response) => {
    response = response.data.data;
    for (var i=0; i < response.length; i++) {
      console.log(response[i])
      if(response[i].Polarity=="POSITIVE")
      posCount++;
      else if(response[i].Polarity=="NEGATIVE")
      negCount++;
      else
      neutCount++;
   }
   setPositive(posCount);
   setNegative(negCount);
   setNeutral(neutCount);
  setPolarity("Polarity: Positive: "+posCount+" Negative: "+negCount+" Neutral: "+neutCount);

  });
}
  async function getCurrentUser() {
    try {
      const user = await Auth.currentAuthenticatedUser({
        bypassCache: false,
      });
      setCurrentUser({
        ...user.attributes,
        role: user.storage?.getItem("Role"),
      });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...user.attributes,
          role: user.storage?.getItem("Role"),
        })
      );
    } catch (error) {
      history.push("/");
    }
  }
  const orderitem = () => {
    history.push("/order");
  };
  const recipeUpload = () => {
    history.push("/recipeupload");
  };
  const visual = () => {
    history.push("/visualization");
  };

  const chat = () => {
    history.push("/chat");
  };

  return (
    <Grid
      alignItems='center'
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      marginTop={"50px"}
    >
      {role?.toLowerCase() === "customer" && (
        <Grid item xs={6} className="grid-item">
          <div className="card-item" onClick={() => orderitem()}>
            <Card className="card" variant="outlined">
              Order Food
            </Card>
          </div>
        </Grid>
      )}

      <Grid item xs={6} className="grid-item">
        <div className="card-item" onClick={() => visual()}>
          <Card className="card" variant="outlined">
            Visualization
          </Card>
        </div>
      </Grid>

      {role?.toLowerCase() !== "customer" && (
        <Grid item xs={6} className="grid-item">
          <div className="card-item" onClick={() => recipeUpload()}>
            <Card className="card" variant="outlined">
              Recipe Upload
            </Card>
          </div>
        </Grid>
      )}
       {role?.toLowerCase() !== "customer" && (
        <Grid item xs={6} className="grid-item">
          <div className="card-item" onClick={() => getPolarity()}>
            <Card className="card" variant="outlined">
              Reviews Polarity
            </Card>
          </div>
        </Grid>
      )}
      

      <Grid item xs={6} className="grid-item">
        <div className="card-item" onClick={() => chat()}>
          <Card className="card" variant="outlined">
            Chat
          </Card>
        </div>
      </Grid>

      <Grid item xs={12} className="grid-item">
      { polarity==""?(<div></div>):(<Plot
        data={[
          {
            x: ["Positive", "Neutral", "Negative"],
            y: [positive, neutral, negative],
            type: 'scatter',
            mode: 'lines',
          },
          {type: 'bar', x: ["Positive", "Neutral", "Negative"], y: [positive, neutral,negative]},
        ]}
        layout={ {width: 400, height: 300, title: 'Reveiws Polarity Plot'} }
      />)}
      </Grid>
    </Grid>
  );
}
