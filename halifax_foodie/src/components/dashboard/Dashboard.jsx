import { Card, Grid } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import './Dashboard.scss';
import { useHistory } from "react-router-dom";

//Dashboard contains all the buttons visualization, Uplaod Recipe, Order Food etc
export default function DashboardComp() {
  //https://reactjs.org/docs/hooks-state.html
  const currentUsrRole = localStorage.getItem("userRole");
  const histNavigate = useHistory();
  const [currUsr, setCurrUsr] = useState(null);

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

  const viewPolarity = () => {
    histNavigate.push('/polarity')
  }

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

      {/* show visualization only to owner */}
      {
        currentUsrRole?.toLowerCase() !== "customer" &&
        <Grid item xs={6} className="grid-item">
          <div className="card-item" onClick={() => visualizaData()}>
            <Card className="card" variant="outlined">
              Visualize Data
            </Card>
          </div>
        </Grid>
      }

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
          <div className="card-item" onClick={() => viewPolarity()}>
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
    </Grid>
  );
}
