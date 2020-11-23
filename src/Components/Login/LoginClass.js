import React, { Component } from 'react';
import { api_url } from '../utils/utils';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Login from '../Login/Login';
import { withRouter } from 'react-router-dom';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const cookies = new Cookies();
console.log(cookies.get('cookie1'));

class LoginClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      usuarioIncorrecto: false,
      buscar: '',
      usuarioLogin: { usernick: '', userpass: '' },
      usuarioSignUp: {
        usernombre: '',
        userapellido: '',
        userfechanacimiento: '',
        usernick: '',
        userpass: '',
        useremail: '',
        userfoto: '',
        usersexo: 'Masculino',
        userpuntaje: 20,
      },
    };
  }

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
      if (response.data.length !== 0) {
        cookies.set('cookie1', response.data[0], { path: '/' });
        this.props.history.push(
          this.props.location.pathname + this.props.location.search
        );
        window.location.reload();
      } else {
        this.setState({
          usuarioIncorrecto: true,
        });
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

  onClickButtonLogout = async (e) => {
    cookies.remove('cookie1');
    this.props.history.push(`/`);
    window.location.reload();
  };

  modaOnCloseFail = () => {
    this.setState({
      usuarioIncorrecto: false,
    });
  };

  render() {
    return (
      <div>
        <Login
          eventoLogin={this.handleChangeLogin}
          formValuesLogin={this.state.usuarioLogin}
          buttonClickLogin={this.onClickButtonLogin}
          eventoSignUp={this.handleChangeSignUp}
          formValuesSignUp={this.state.usuarioSignUp}
          buttonClickSignUp={this.onClickButtonSignUp}
          buttonClickLogout={this.onClickButtonLogout}
          FailUser={this.state.usuarioIncorrecto}
          modalOnCloseFail={this.modaOnCloseFail}
        />
      </div>
    );
  }
}

export default withRouter(LoginClass);
