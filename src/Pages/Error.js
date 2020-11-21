import React, { Component } from "react";
import Error from "../Components/Error/Error";

class ErrorPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Error />
      </div>
    );
  }
}

export default ErrorPage;
