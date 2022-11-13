import React from "react";
import { useHistory } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import LexChat from "react-lex";
import { useState } from "react";

export default function Dashboard() {
  // const [Data, setData] = useState()
  const role = localStorage.getItem("Role");
  // const role = localStorage.getItem("Role");
  const history = useHistory();
  //   var role;
  //   var isCustomer;
  //   useEffect(() => {
  //     setRole(localStorage.getItem("Role"));
  //     if (role.toLowerCase() == "customer") {
  //       isCustomer = true;
  //     } else {
  //       isCustomer = false;
  //     }
  //     console.log("isCust", isCustomer);
  //   }, []);

  // const getUseDetails = async () => {
  //     await axios.get('https://tutorial4-api.herokuapp.com/api/users')
  //         .then((response) => {
  //             console.log("response data: ", response.data.data)
  //             setData(response.data.data)
  //             setAllData(response.data.data)
  //         })
  // }

  // const viewProfile = async (id) => {

  //     await history.push(`/profile/${id}`);
  // }

  // const onFilter = (e)=> {

  //     let result =[];
  //     result = AllData.filter((filter) =>
  //         filter.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
  //         filter.lastName.toLowerCase().includes(e.target.value.toLowerCase()) )

  //     setData(result);
  // }
  const chatbot = () => {
    history.push("/chatbot");
  };
  const orderitem = () => {
    history.push("/order");
  };
  const wordcloud = () => {
    history.push("/wordcloud");
  };
  const recipeUpload = () => {
    history.push("/recipeupload");
  };
  const visual = () => {
    history.push("/visualization");
  };
  // const pubsub = () => {
  //   history.push("/pubsub");
  // };
  const logout = () => {
    localStorage.clear();
    window.location.reload();
    history.push("/");
  };
  const chat = () => {
    history.push("/chat");
  };
  return (
    <div>
      <Row>
        <Col>
          <Button className="add-button" onClick={() => chatbot()}>
            Chatbot
          </Button>
        </Col>
        <Col>
          {role.toLowerCase() == "customer" ? (
            <Button className="add-button" onClick={() => orderitem()}>
              Order Page
            </Button>
          ) : (
            <Button
              className="add-button"
              onClick={() => orderitem()}
              disabled={true}
            >
              Order Page
            </Button>
          )}
        </Col>
        <Col>
          <Button className="add-button" onClick={() => wordcloud()}>
            Word Cloud
          </Button>
        </Col>
        <Col>
          <Button className="add-button" onClick={() => visual()}>
            Visualization
          </Button>
        </Col>
        <Col>
          {role.toLowerCase() == "customer" ? (
            <Button
              className="add-button"
              onClick={() => recipeUpload()}
              disabled={true}
            >
              Recipe Upload
            </Button>
          ) : (
            <Button className="add-button" onClick={() => recipeUpload()}>
              Recipe Upload
            </Button>
          )}
        </Col>
        {/* <Col>
          <Button className="add-button" onClick={() => pubsub()}>
            One to One Chat
          </Button>
        </Col> */}
        <Col>
          <Button className="add-button" onClick={() => logout()}>
            Logout
          </Button>
        </Col>
        <Col>
          <Button className="add-button" onClick={() => chat()}>
            Chat
          </Button>
        </Col>
      </Row>
      <LexChat
        botName="HalifaxFoodie"
        IdentityPoolId="us-east-1:1c14fb01-663e-45b0-a5fd-26ad6e14b8cc"
        placeholder="Placeholder text"
        backgroundColor="#FFFFFF"
        height="430px"
        region="us-east-1"
        headerText="Chat with our awesome bot"
        headerStyle={{ backgroundColor: "#ABD5D9", fontSize: "30px" }}
        greeting={
          "Hello, how can I help? You can say things like 'help' to get more info"
        }
      />
      {/* <div className="all-content-center">
                <div className="ccontainer">
                    <div className="center-box">
                        <div className="main-dbox">
                            <div className="heading-text">
                                <h3>Hello</h3><br />
                                
                            </div>
                            <h2>Email</h2>
                        </div>
                    </div>
                </div>
            </div> */}
      {/* <div className="mt-5 text-center">
                <form>
                Search:<input  type = "text" name="search" onChange = {(e)=>{onFilter(e)}} />
                </form>
            </div>
            <div className="w-80 m-5">
                <Table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Picture</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Data?.map((userData) => {
                                return (
                                    <tr class="cursor-pointer" onClick={() => viewProfile(userData.id)}>
                                        <td>{userData.title}</td>
                                        <td>{userData.firstName}</td>
                                        <td>{userData.lastName}</td>
                                        <td>{userData.email}</td>
                                        <td><img src={userData.picture}></img></td>
                                        <td><button onClick={() => viewProfile(userData.id)}>View</button></td>
                                    </tr>)

                            })
                        }
                    </tbody>
                </Table>
            </div>
 */}
    </div>
  );
}
