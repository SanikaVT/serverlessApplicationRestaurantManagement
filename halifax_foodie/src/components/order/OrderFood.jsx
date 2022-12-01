import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Col, ListGroup, Row, Spinner } from "react-bootstrap";
import { withRouter } from "react-router";
import "./OrderFood.scss";


export class OrderFoodComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUsr: JSON.parse(localStorage.getItem("currentLocalUser")),
      heading: "",
      title: "",
      ingredient: "",
      isLoading: true
    };
  }
  //Fetches food from dynamodb
  //https://reactjs.org/docs/react-component.html
  async componentDidMount() {
      //Reference: https://axios-http.com/docs/post_example
    await axios
      .post("https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/fetchfood",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        var result = JSON.parse(response.data.body);
        console.log(response)
        this.setState({
          listFood: result[0].food,
        });
      }).catch(error => {
        this.setState({isLoading: false})
      })
  }
  //Code to order an item from the given list
  async placeOrder(row) {
    const body = {
      foodName: row["foodName"],
      foodId: row["foodId"],
      price: row["price"],
      ingredient: row["ingredient"],
      userName: this.state.currUsr.email,
    };
    try {
        //Reference: https://axios-http.com/docs/post_example
      await axios.post(
        "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/addorder",
        JSON.stringify(body),
        { headers: { "Content-Type": "application/json" } }
      );
      alert(body.userName+" ordered " + row["foodName"]);
      this.props.history.push("/postReview", { foodId: body.foodId });
    } catch (err) {
    }
  }

  //Exports recipe of the selected item
  async exportRecipe(row) {
    this.setState({
      heading: "Extracted Title and Key Ingredients",
      title: row.foodName,
      ingredient: row.ingredient,
    });
  }

  render() {
    return (
        // {/* references */}
        // {/* https://mui.com/material-ui/react-grid/ */}
        <Row className="to-do-list-items">
          <Col md={10} lg={5} className="items-container">
            <Card className="item-card">
              <Card.Header style={{ fontWeidht: "bold" }}>
                Order Your Food
              </Card.Header>
              <Card.Body>
                {
                  this.state.isLoading &&
                  <div className="d-flex h-100 justify-content-center align-items-center">
                    <Spinner animation="border" variant="primary" />
                  </div>
                } {
                  !this.state.isLoading &&
                  this.state.food.map((row) => (
                    <Card className="card-content-incomplete">
                      <Card.Body>
                        <ListGroup className="list-group-flush" style={{marginBottom: '1rem'}}>
                          <ListGroup.Item>
                            <strong>Food: </strong>
                            <span>{row.foodName}</span>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Price:  </strong>
                            <span>${row.price}</span>
                          </ListGroup.Item>
                        </ListGroup>
                        <Button style={{marginRight: '1rem'}} className="add-button" onClick={() => this.orderitem(row)}>
                          Place Order
                        </Button>
                        <Button onClick={() => this.exportRecipe(row)}>
                          Extract ingredients
                        </Button>
                      </Card.Body>
                    </Card>
                  ))
                }
              </Card.Body>
            </Card>
          </Col>
        {
          this.state.heading &&
          <Col md={10} lg={5}>
            {/* references */}
            {/* https://mui.com/material-ui/react-card/ */}
            <Card>
              <Card.Header>{this.state.heading}</Card.Header>
              <Card.Body>
                <ListGroup className="list-group-flush" style={{marginBottom: '1rem'}}>
                  <ListGroup.Item>
                    <strong>Title:  </strong>
                    <span>{this.state.title}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Ingredients:  </strong>
                    <span>{this.state.ingredient}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        }
        </Row>
    );
  }
}

export default withRouter(OrderFoodComp);
