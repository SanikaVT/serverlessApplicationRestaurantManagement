import React, { Component } from "react";
import { withRouter } from "react-router";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "./order.css";

export class orderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      food: [],
      heading: "",
      title: "",
      ingredient: "",
    };
  }

  async componentDidMount() {
    await axios
      .post(
        "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/fetchfood",

        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      )
      .then((response) => {
        response = JSON.parse(response.data.body);
        this.setState({
          food: response[0].food,
        });
      });
  }
  async orderitem(row) {
    const body = {
      foodName: row["foodName"],
      foodId: row["foodId"],
      price: row["price"],
      ingredient: row["ingredient"],
      userName: localStorage.getItem("user").email,
    };

    try {
      let result = await axios.post(
        "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/addorder",

        JSON.stringify(body),
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("op", result);
      alert("Ordered " + row["foodName"] + " Successfully");
      this.props.history.push("/giveratings", { foodId: body.foodId });
    } catch (error) {
      console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
    }
  }

  async exportRecipe(row) {
    this.setState({
      heading: "Extracted Title and Key Ingredients",
      title: "Title:" + row.foodName,
      ingredient: "Ingredients:" + row.ingredient,
    });
  }

  //  const  goToHome() {
  //     this.props.history.push("/");
  //     window.location.reload();
  //   }

  render() {
    return (
      <Container>
        {/* <Button onClick={} variant="primary">
          Home
        </Button> */}
        <Row className="to-do-list-items">
          <Col md={12} lg={6}>
            <div>
              <h3>Order Your Food</h3>
              {this.state.food.map((row) => (
                <Card className="card-content-incomplete">
                  <Row className="card-item">
                    <Col xs={3} md={5} className="card-item-content">
                      <Card.Body>
                        <Card.Title>Food: {row.foodName}</Card.Title>
                        <Card.Title>Price: ${row.price}</Card.Title>
                        {/* <Card.Title>Ingredients: {row.ingredient}</Card.Title> */}
                        {/* <Card.Title>{this.state.ingredient}</Card.Title> */}
                      </Card.Body>
                    </Col>
                    <Col xs={3} md={5} className="card-item-content">
                      <Button
                        className="add-button"
                        onClick={() => this.orderitem(row)}
                      >
                        Place Order
                      </Button>
                      <div></div>
                      <Button onClick={() => this.exportRecipe(row)}>
                        Extract ingredients
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          </Col>

          <Col md={12} lg={6}>
            <div className="card-item-content">
              <h4>{this.state.heading}</h4>

              <Row className="card-item">
                <Col xs={3} md={7} className="card-item-content">
                  <Card.Body>
                    <Card.Title>{this.state.heading}</Card.Title>
                    <Card.Title>{this.state.title}</Card.Title>
                    <Card.Title>{this.state.ingredient}</Card.Title>
                  </Card.Body>
                </Col>
                <Col xs={3} md={3} className="card-item-content"></Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    );
  }
}

export default withRouter(orderPage);
