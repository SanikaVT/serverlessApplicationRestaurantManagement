import React, { Component } from "react";
import { withRouter } from "react-router";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
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

  componentDidMount() {
    var body = {
      body: this.state.user.username,
    };
    axios
      .post(
        "https://su4w77rtho2e6y5g5ursrddecq0zikbc.lambda-url.us-east-1.on.aws/",

        {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",

            "Access-Control-Allow-Credentials": "true",
          },

          body: JSON.stringify(body),
        }
      )
      .then((resposne) => {
        this.setState({
          food: resposne.data[0]["food"],
          recommandation: resposne.data[0]["recommandation"],
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
        "https://prm6clmwohmnq3ouerds6uhzya0gppjj.lambda-url.us-east-1.on.aws/",

        JSON.stringify(body),
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("op", result);
      alert("Ordered " + row["foodName"] + " Successfully");
      this.props.history.push("/giveratings");
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
