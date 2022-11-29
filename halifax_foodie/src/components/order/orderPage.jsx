import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { withRouter } from "react-router";
import "./order.css";
import Plot from 'react-plotly.js';


export class orderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      food: [],
      heading: "",
      title: "",
      ingredient: "",
      polarity:"",
      positive:0,
      negative:0,
      neutral:0
      
    };
  }
  //Fetches food from dynamodb
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
  //Code to order an item from the given list
  async orderitem(row) {
    const body = {
      foodName: row["foodName"],
      foodId: row["foodId"],
      price: row["price"],
      ingredient: row["ingredient"],
      userName: this.state.user.email,
    };
    console.log(body)
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
      console.error(error.response.data); 
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
  //function to get Polarity
  async getPolarity(row){
    var posCount=0;
    var negCount=0;
    var neutCount=0;
    await axios
    .post(
      "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/polarity",

      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
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
     this.setState({positive:posCount,negative:negCount,neutral:neutCount})
     this.setState({polarity:"Positive: "+posCount+" Negative: "+negCount+" Neutral: "+neutCount});
    });
  }

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
                    <Col xs={5} md={6} className="card-item-content">
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
                    <Button onClick={() => this.getPolarity()}>Food Reviews Polarity</Button>

                  </Card.Body>
                  <div></div>
                 { this.state.polarity==""?(<div></div>):(<Plot
        data={[
          {
            x: ["Positive", "Neutral", "Negative"],
            y: [this.state.positive, this.state.neutral, this.state.negative],
            type: 'scatter',
            mode: 'lines',
          },
          {type: 'bar', x: ["Positive", "Neutral", "Negative"], y: [this.state.positive, this.state.neutral, this.state.negative]},
        ]}
        layout={ {width: 400, height: 300, title: 'Reveiws Polarity Plot'} }
      />)}
                  
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

export default withRouter(orderPage);
