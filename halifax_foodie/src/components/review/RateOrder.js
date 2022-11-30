import axios from "axios";
import React, { Component } from "react";
import { Button, Row } from "react-bootstrap";
import { withRouter } from "react-router";
export class RateOrderComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.getItem("currentLocalUser")),
      rating: "",
      foodId: props.location.state.foodId,
    };
  }
  onValueChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  saveItem = async (event) => {
    event.preventDefault();
    const body = {
      ratings: this.state.rating,
      username: this.state.user.username,
      foodId: this.state.foodId,
    };

    try {
      //Reference: https://axios-http.com/docs/post_example

      let result = await axios.post(
        "https://vvzh0tcvl0.execute-api.us-east-1.amazonaws.com/default/addreview",

        JSON.stringify(body),
        { headers: { "Content-Type": "application/json" } }
      );
      this.cancel();
    } catch (error) {
      console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
    }
  };

  cancel = (e) => {
    this.props.history.push("/fetchFood");
  };
  render() {
    return (
      <Row className="rating-content">
        <div>
          <h2>Please give your review</h2>
        </div>
        <div>
          <input
            type="text"
            palceholder="Add task"
            name="rating"
            value={this.state.rating}
            onChange={this.onValueChange}
          />
        </div>
        <div className="add-button">
          <Button className="primary-button" onClick={this.saveItem}>
            Submit
          </Button>
          <Button className="primary-button" onClick={this.cancel}>
            Cancel
          </Button>
        </div>
      </Row>
    );
  }
}
export default withRouter(RateOrderComp);
