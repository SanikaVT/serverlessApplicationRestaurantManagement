import axios from "axios";
import React, { Component } from "react";
import { Button, Row } from "react-bootstrap";
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
      <Row className="rating-content">
        <div>
          <h2>Rate your Order</h2>
        </div>
        <div>
          <input
            type="text"
            name="review"
            value={this.state.review}
            onChange={this.onValueChange}
          />
        </div>
        <div className="add-button">
          <Button className="primary-button" onClick={this.submitReview}>
            Submit
          </Button>
          <Button className="primary-button" onClick={this.cancelItem}>
            Cancel
          </Button>
        </div>
      </Row>
    );
  }
}
export default withRouter(RateOrderComp);
