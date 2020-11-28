import React, { Component } from "react";
import { api_url, serverImageURL } from "../utils/utils";
import Cookies from "universal-cookie";
import axios from "axios";
import Login from "../Login/Login";
import { withRouter } from "react-router-dom";

const cookies = new Cookies();

class LoginClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      usuarioCreado: false,
      usuarioErrorSignup: false,
      usuarioIncorrecto: false,
      fotoUsuario: "",
      fileNameFotoUsuario: "",
      buscar: "",
      usuarioLogin: { usernick: "", userpass: "" },
      usuarioSignUp: {
        usernombre: "",
        userapellido: "",
        userfechanacimiento: "",
        usernick: "",
        userpass: "",
        useremail: "",
        userfoto: "https://www.remtur.com/admin/img/colaboradores/usuario.png",
        usersexo: "Masculino",
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
  //obtiene la extension del archivo que se ingresa en el input
  getFileExtension1(filename) {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
  }

  handleOnChangeFoto = (e) => {
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
        userfoto: `${serverImageURL}/getImagen?imagen=${
          this.state.usuarioSignUp.usernick
        }.${this.getFileExtension1(e.target.files[0].name)}`,
      },
      fotoUsuario: e.target.files[0],
      fileNameFotoUsuario: `${
        this.state.usuarioSignUp.usernick
      }.${this.getFileExtension1(e.target.files[0].name)}`.toString(),
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
        cookies.set("cookie1", response.data[0], { path: "/" });
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
      const formData = new FormData();
      formData.append("file", this.state.fotoUsuario);
      if (
        /^[A-Z._-][A-Z0-9._-]{0,254}$/i.test(this.state.usuarioSignUp.usernick)
      ) {
        //peticion para el ingreso del usuario dependiendo de si existe o no la foto
        const response = await axios.post(
          `${api_url}/api/usuario`,
          this.state.usuarioSignUp
        );
        //peticion para el ingreso de la imagen el servidor de nodejs
        if (
          this.state.usuarioSignUp.userfoto &&
          this.state.fileNameFotoUsuario &&
          this.state.fotoUsuario
        ) {
          const res = await axios.post(
            `${serverImageURL}/upload?usuario=${this.state.fileNameFotoUsuario}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        }
        ////////
        this.setState({
          loading: false,
          error: null,
          usuarioCreado: true,
        });
      } else {
        this.setState({
          usuarioErrorSignup: true,
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
        usuarioErrorSignup: true,
      });
    }
  };

  modaOnCloseFail = () => {
    this.setState({
      usuarioIncorrecto: false,
      usuarioCreado: false,
      usuarioErrorSignup: false,
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
          FailUser={this.state.usuarioIncorrecto}
          modalOnCloseFail={this.modaOnCloseFail}
          nombreBoton={this.props.nombreBoton}
          usuarioCreado={this.state.usuarioCreado}
          usuarioErrorSignup={this.state.usuarioErrorSignup}
          nick_del_usuario={this.state.usuarioSignUp.usernick}
          handleOnChangeFoto={this.handleOnChangeFoto}
        />
      </div>
    );
  }
}

export default withRouter(LoginClass);
