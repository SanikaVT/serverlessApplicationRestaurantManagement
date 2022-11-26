import { Card, Grid } from "@mui/material";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import './Dashboard.scss';

export default function Dashboard() {
  const role = localStorage.getItem("Role");
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getCurrentUser();
  }, []);

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

      <Grid item xs={6} className="grid-item">
        <div className="card-item" onClick={() => chat()}>
          <Card className="card" variant="outlined">
            Chat
          </Card>
        </div>
      </Grid>
    </Grid>
  );
}
