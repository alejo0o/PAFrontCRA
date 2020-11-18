import { Navbar, FormControl, Nav, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { api_url } from "../utils/utils";
import Cookies from "universal-cookie";
import axios from "axios";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const cookies = new Cookies();
console.log(cookies.get("cookie1"));

class ComponentNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,

      buscar: "",
      usuarioLogin: { usernick: "", userpass: "" },
      usuarioSignUp: {
        usernombre: "",
        userapellido: "",
        userfechanacimiento: "",
        usernick: "",
        userpass: "",
        useremail: "",
        userfoto: "",
        usersexo: "Masculino",
        userpuntaje: 20,
      },
    };
    // this.onClickButtonSignUp = this.onClickButtonSignUp.bind(this);
    // this.onClickButtonLogin = this.onClickButtonLogin.bind(this);
  }
  componentDidMount() {}
  handleChange = (e) => {
    //maneja el cambio en el componente hijo y setea los valores a las variables de estado
    this.state.buscar(encodeURIComponent(e.target.value));
  };
  handleChangeLogin = (e) => {
    //maneja el cambio en el componente hijo y setea los valores a las variables de estado
    this.setState({
      usuarioLogin: {
        ...this.state.usuarioLogin,
        usernick: this.state.usuarioLogin.usernick,
        userpass: this.state.usuarioLogin.userpass,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleChangeSignUp = (e) => {
    //maneja el cambio en el componente hijo y setea los valores a las variables de estado
    this.setState({
      usuarioSignUp: {
        ...this.state.usuarioSignUp,
        usernombre: this.state.usuarioSignUp.usernombre,
        userapellido: this.state.usuarioSignUp.userapellido,
        userfechanacimiento: this.state.usuarioSignUp.userfechanacimiento,
        usernick: this.state.usuarioSignUp.usernick,
        userpass: this.state.usuarioSignUp.userpass,
        usersexo: this.state.usuarioSignUp.usersexo,
        useremail: this.state.usuarioSignUp.useremail,
        userfoto: this.state.usuarioSignUp.userfoto,
        [e.target.name]: e.target.value,
      },
    });
  };

  onClickButtonLogin = async (e) => {
    //maneja el click del button para hacer el post del formulario pregunta
    this.setState({
      loading: true,
      error: null,
    });
    try {
      e.preventDefault();
      const response = await axios.get(
        `${api_url}/api/customqueries/getUsuario/${this.state.usuarioLogin.usernick}/${this.state.usuarioLogin.userpass}`
      );
      if (Object.values(response.data) !== 0) {
        cookies.set("cookie1", response.data, { path: "/" });
      } else {
        cookies.remove("cookie1");
      }
      this.setState({
        loading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  onClickButtonSignUp = async (e) => {
    //maneja el click del button para hacer el post del formulario pregunta
    this.setState({
      loading: true,
      error: null,
    });
    try {
      e.preventDefault();
      const response = await axios.post(
        `${api_url}/api/usuario`,
        this.state.usuarioSignUp
      );
      this.setState({
        loading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  render() {
    return (
      <Navbar expand="lg" style={{ backgroundColor: "#dae5ed" }}>
        <Navbar.Brand href="#home">TASBP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </Nav>
          <Nav>
            <Form inline onChange={this.handleChange}>
              <FormControl
                type="text"
                placeholder="Buscar"
                className="mr-sm-2"
                name="buscar"
              />
              <a href={`/buscar?buscar=${this.state.buscar}`}>
                <Button variant="outline-success">Buscar</Button>
              </a>
            </Form>
          </Nav>
          <Nav>
            <Link
              to="/"
              className="btn btn-primary ml-2"
              style={{ width: "8em" }}
            >
              Log In
            </Link>
            {/* <Login
              eventoLogin={this.handleChangeLogin}
              formValuesLogin={this.state.usuarioLogin}
              buttonClickLogin={this.onClickButtonLogin}
              eventoSignUp={this.handleChangeSignUp}
              formValuesSignUp={this.stateusuarioSignUp}
              buttonClickSignUp={this.onClickButtonSignUp}
              buttonClickLogout={this.onClickButtonLogout}
            /> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default ComponentNavbar;
