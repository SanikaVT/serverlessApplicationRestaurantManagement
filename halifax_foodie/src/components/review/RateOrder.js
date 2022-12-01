import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { withRouter } from "react-router";
export class RateOrderComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currUsr: JSON.parse(localStorage.getItem("currentLocalUser")),
      review: "",
      f_id: props.location.state.foodId,
    };
  }

  submitReview = async (event) => {
    event.preventDefault();
    const body = {
      ratings: this.state.review,
      username: this.state.currUsr.username,
      foodId: this.state.f_id,
    };

    try {
      //Reference: https://axios-http.com/docs/post_example
      await axios.post(
        "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/addreview",

        JSON.stringify(body),
        { headers: { "Content-Type": "application/json" } }
      );
      this.cancelItem();
    } catch (error) {
      console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
    }
  };

  cancelItem = (e) => {
    this.props.history.push("/fetchFood");
  };

  onValueChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (

      <div className="row rating-content justify-content-center align-items-center h-50">
      <div className="col-md-4">
        <Card>
          <Card.Header>
            Rate your Order
          </Card.Header>
          <Card.Body>
          <input
            className="form-control"
            placeholder="Type your review ..."
            type="text"
            name="review"
            value={this.state.review}
            onChange={this.onValueChange}
          />
            <Button className="btn primary-button" onClick={this.submitReview}>
            Submit
          </Button>
          <Button className="btn primary-button" onClick={this.cancelItem}>
            Cancel
          </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
    );
  }
}
export default withRouter(RateOrderComp);
