import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import LexChat from "react-lex";
import { useState } from "react";
import {Auth} from 'aws-amplify';
import Image from 'react-bootstrap/Image';

export default function Dashboard() {
  // const [Data, setData] = useState()
  const role = localStorage.getItem("Role");
  // const role = localStorage.getItem("Role");
  const history = useHistory();
  const [currentUser,setCurrentUser] = useState(null)

  useEffect(() => {
      getCurrentUser()
  }, [])

  async function getCurrentUser() {
      try {
          const user = await Auth.currentAuthenticatedUser({
              bypassCache: false
          })
          setCurrentUser({...user.attributes, role: user.storage?.getItem('Role')});
          localStorage.setItem('currentUser', JSON.stringify({...user.attributes, role: user.storage?.getItem('Role')}))
      } catch(error) {
          history.push('/')
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
  const logout = () => {
    localStorage.clear();
    window.location.reload();
    history.push("/");
  };
  const chat = () => {
    history.push("/chat");
  };
  return (
    <div className="p-5">
      <Col className="card-item-content"> 
        <Row className="card-item">
          {role.toLowerCase() == "customer" ? (
            <Button className="add-button" onClick={() => orderitem()}>
              Order Food
            </Button>
          ) : (<div></div>
            // <Button
            //   className="add-button"
            //   onClick={() => orderitem()}
            //   disabled={true}
            // >
            //   Order Food
            // </Button>
          )}
        </Row>
        
        <Row className="card-item">
          <Button className="add-button" onClick={() => visual()}>
            Visualization
          </Button>
        </Row>
        <Row className="card-item">
          {role.toLowerCase() == "customer" ? (<div></div>
            // <Button
            //   className="add-button"
            //   onClick={() => recipeUpload()}
            //   disabled={true}
            // >
            //   Recipe Upload
            // </Button>
          ) : (
            <Button className="add-button" onClick={() => recipeUpload()}>
              Recipe Upload
            </Button>
          )}
        </Row>
        <Row className="card-item">
          <Button className="add-button" onClick={() => logout()}>
            Logout
          </Button>
        </Row>
        <Row className="card-item">
          <Button className="add-button" onClick={() => chat()}>
            Chat
          </Button>
        </Row>
      </Col>
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
       {/* <div><img
    src='https://as2.ftcdn.net/v2/jpg/03/78/97/59/1000_F_378975954_G39M4ptXAjxKy80gbBIEo0wqBkk89gBF.jpg'
    alt='example'
  /></div> */}
    </div>
   
  );
}
