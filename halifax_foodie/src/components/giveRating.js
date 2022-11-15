import React, { Component } from "react";
import { withRouter } from "react-router";
import { Row, Button } from "react-bootstrap";
import axios from "axios";
export class giveRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      rating: "",
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
    };

    try {
      let result = await axios.post(
        "https://ogzkp4mnok7tvtdcjeadoxhnba0fwdkh.lambda-url.us-east-1.on.aws/",

        JSON.stringify(body),
        { headers: { "Content-Type": "application/json" } }
      );
      this.cancel();
    } catch (error) {
      console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
    }
  };

  cancel = (e) => {
    this.props.history.push("/order");
  };
  render() {
    return (
      <Row className="rating-content">
        <div>
          <h2>Please give your feedback</h2>
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
export default withRouter(giveRating);
