import React, { Component } from "react";
import { withRouter } from "react-router";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router";
import axios from "axios";
import "./order.css";

export class orderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      food: [],
      recommandation: [],
    };
  }

  async componentDidMount() {
    var body = {
      body: this.state.user.username,
    };

    await axios
      .post(
        "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/fetchfood",

        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",

            "Access-Control-Allow-Credentials": "true",
          },

          body: JSON.stringify(body),
        }
      )
      .then((response) => {
        response = JSON.parse(response.data.body);
        this.setState({
          food: response[0].food,
          recommendation: response[0].recommendation,
        });
      });
  }
  async orderitem(row) {
    const body = {
      foodName: row["foodName"],
      foodId: row["foodId"],
      price: row["price"],
      ingredient: row["ingredient"],
      userName: this.state.user.username,
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

  render() {
    return (
      <Container>
        <Row className="to-do-list-items">
          <Col md={12} lg={6}>
            <div>
              <h2>Order Your Food</h2>
              {this.state.food.map((row) => (
                <Card className="card-content-incomplete">
                  <Row className="card-item">
                    <Col xs={3} md={7} className="card-item-content">
                      <Card.Body>
                        <Card.Title>Food: {row.foodName}</Card.Title>
                        <Card.Title>Price: ${row.price}</Card.Title>
                        <Card.Title>Ingredients: {row.ingredient}</Card.Title>
                      </Card.Body>
                    </Col>
                    <Col xs={3} md={3} className="card-item-content">
                      <Button
                        className="add-button"
                        onClick={() => this.orderitem(row)}
                      >
                        Place Order
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          </Col>
          <Col md={12} lg={6}>
            <div>
              <h2>Recommended Food</h2>
              {this.state.recommandation.map((row) => (
                <Card>
                  <Card.Body>
                    <Card.Title className="card-item-completed">
                      Food Name:{row.foodName}
                    </Card.Title>
                    <Card.Title className="card-item-completed">
                      Price:{row.price}
                    </Card.Title>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(orderPage);
