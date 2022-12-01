import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { withRouter } from "react-router";
import "./OrderFood.css";


export class OrderFoodComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUsr: JSON.parse(localStorage.getItem("currentLocalUser")),
      heading: "",
      title: "",
      ingredient: "",
      listFood: [],  
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
      });
      
      
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
      title: "Title:" + row.foodName,
      ingredient: "Ingredients:" + row.ingredient,
    });
  }

  render() {
    return (
      <Container>
        <Row className="to-do-list-items">
          <Col md={12} lg={5}>
            <div>
              <h3>Order Your Food</h3>
              {this.state.listFood.map((row) => (
                <Card className="card-content-incomplete">
                  <Row className="card-item">
                    <Col xs={5} md={6} className="card-item-content">
                      <Card.Body>
                        <Card.Title>Food: {row.foodName}</Card.Title>
                        <Card.Title>Price: ${row.price}</Card.Title>
                      </Card.Body>
                    </Col>
                    <Col xs={3} md={5} className="card-item-content">
                      
                      <Button onClick={() => this.exportRecipe(row)}>
                        Extract ingredients
                      </Button>
                      <div></div>
                    <Col xs={3} md={5} className="card-item-content"><Button
                        className="add-button"
                        onClick={() => this.placeOrder(row)}
                      >
                        Place Order
                      </Button></Col>
                      
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          </Col>
          <Col>
            <div>
              <Row>
                <Col md={12} lg={6} >
                  <Card.Body>
                  <h4>{this.state.heading}</h4>
                    <Card.Title>{this.state.title}</Card.Title>
                    <div></div>
                    <Card.Title>{this.state.ingredient}</Card.Title>
                    <div></div>
                    <div></div>
                  </Card.Body>
                  <div></div>
                  
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    );
  }
}

export default withRouter(OrderFoodComp);
