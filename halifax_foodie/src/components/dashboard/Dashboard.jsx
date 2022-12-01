import { Card, Grid } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import './Dashboard.scss';
import { useHistory } from "react-router-dom";
import axios from "axios";
//Dashboard contains all the buttons visualization, Uplaod Recipe, Order Food etc
export default function DashboardComp() {
  //https://reactjs.org/docs/hooks-state.html
  const currentUsrRole = localStorage.getItem("userRole");
  const histNavigate = useHistory();
  const [currUsr, setCurrUsr] = useState(null);
  const[positive,setPositive]=useState(0);
  const[negative,setNegative]=useState(0);
  const[neutral,setNeutral]=useState(0);
  const[polarity,setPolarity]=useState("");

  useEffect(() => {
    currentUsrInfo();
  }, []);

  /*DO NOT REMOVE THIS COMMENTED CODE*/

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getCheck();
  //   }, 10000);
  //   return () => clearInterval(interval);
  // },[]);



  async function getCheck() {
    await axios
    .post(
      "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/getcheck",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      var flag=JSON.parse(response.data.body)
      console.log(flag)
      if(flag=="true")
      {
        histNavigate.push("/chat");
      }
    });    
  }

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
  async function currentUsrInfo() {
    try {
      const user = await Auth.currentAuthenticatedUser({
        bypassCache: false,
      });
      setCurrUsr({
        ...user.attributes,
        role: user.storage?.getItem("userRole"),
      });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...user.attributes,
          role: user.storage?.getItem("userRole"),
        })
      );
    } catch (error) {
      console.log(error);
      histNavigate.push("/");
    }
  }
  const fetchFoodList = () => {
    histNavigate.push("/fetchFood");
  };
  const ownerRecipeUpload = () => {
    histNavigate.push("/ownerRecipeUpload");
  };
  const visualizaData = () => {
    histNavigate.push("/visualize");
  };

  const chatWithUsr = () => {
    histNavigate.push("/chat");
  };

  return (
    <Grid
      alignItems='center'
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      marginTop={"50px"}
    >
      {currentUsrRole?.toLowerCase() === "customer" && (
        <Grid item xs={6} className="grid-item">
          <div className="card-item" onClick={() => fetchFoodList()}>
            <Card className="card" variant="outlined">
              Order Food
            </Card>
          </div>
        </Grid>
      )}

      <Grid item xs={6} className="grid-item">
        <div className="card-item" onClick={() => visualizaData()}>
          <Card className="card" variant="outlined">
            Visualize Data
          </Card>
        </div>
      </Grid>

      {currentUsrRole?.toLowerCase() !== "customer" && (
        <Grid item xs={6} className="grid-item">
          <div className="card-item" onClick={() => ownerRecipeUpload()}>
            <Card className="card" variant="outlined">
              Upload Recipe
            </Card>
          </div>
        </Grid>
      )}
       {currentUsrRole?.toLowerCase() !== "customer" && (
        <Grid item xs={6} className="grid-item">
          <div className="card-item" onClick={() => getPolarity()}>
            <Card className="card" variant="outlined">
              Review Polarity
            </Card>
          </div>
        </Grid>
      )}
      <Grid item xs={6} className="grid-item">
        <div className="card-item" onClick={() => chatWithUsr()}>
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
