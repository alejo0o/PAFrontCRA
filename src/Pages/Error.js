import React, { Component } from "react";
import axios from "axios";
import Loader from "../Components/Spinner/Spinner";
import Error from "../Components/Error/Error";

class Respuesta extends Component {
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

export default Respuesta;
