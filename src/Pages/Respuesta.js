import React, { Component } from "react";
import axios from "axios";
import Loader from "../Components/Spinner/Spinner";
import DisplayRespuestas from "../Components/Respuesta/DisplayRespuestas";
import PreguntaUsuario from "../Components/Respuesta/PreguntaUsuario";
import RespFav from "../Components/Respuesta/RespFav";
import Categoria from "../Components/Categorias/Categorias";
import Clasificacion from "../Components/Clasificacion/Clasificacion";
import Cookies from "universal-cookie";
import FormRespuesta from "../Components/FormRespuesta/FormRespuesta";
import "semantic-ui-css/semantic.min.css";
import Login from "../Components/Login/LoginClass";
import { Button } from "semantic-ui-react";
import { api_url } from "../Components/utils/utils";
import PreguntaCerrada from "../Components/Pregunta/PreguntaCaducada";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const cookies = new Cookies();

class Respuesta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      warning: false,
      error: null,
      loading: true,
      usuario: cookies.get("cookie1"),
      respuestasPregunta: {},
      preguntaRespuesta: {},
      respFav: {},
      respuesta: {
        userid: "",
        pregid: "",
        resptexto: "",
      },
      //paginador
      page: 1,
      total: 0,
    };
  }
  componentDidMount() {
    this.fetchData();
    if (this.state.usuario)
      this.setState({
        respuesta: {
          userid: this.state.usuario.userid,
          pregid: parseInt(this.props.match.params.preguntaID),
          resptexto: "",
        },
      });
  }

  fetchData = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const { data: respuestasPregunta } = await axios.get(
        `${api_url}/api/customqueries/respPregunta/${this.props.match.params.preguntaID}?pageNumber=${this.state.page}`
      );
      const { data: preguntaRespuesta } = await axios.get(
        `${api_url}/api/customqueries/pregResp/${this.props.match.params.preguntaID}`
      );
      const { data: respFav } = await axios.get(
        `${api_url}/api/customqueries/respFav/${this.props.match.params.preguntaID}`
      );
      this.setState({
        preguntaRespuesta: preguntaRespuesta,
        respuestasPregunta: respuestasPregunta,
        respFav: respFav,
        loading: false,
        error: null,
        //total de paginas
        total: respuestasPregunta.totalPages,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  onSubmitRespuesta = async (e) => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      ///////////////////////////////////
      this.isFirstAnswer();

      const response = await axios.post(
        `${api_url}/api/respuesta`,
        this.state.respuesta
      );
      //////////////////////////////////
      const { data: usuarioNuevo } = await axios.get(
        `${api_url}/api/usuario/${this.state.usuario.userid}`
      );

      cookies.set("cookie1", usuarioNuevo, { path: "/" });
      this.setState({
        success: true,
        usuario: usuarioNuevo,
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
  handleRespuestaChange = (e) => {
    this.setState({
      respuesta: {
        ...this.state.respuesta,
        userid: this.state.usuario.userid,
        pregid: parseInt(this.props.match.params.preguntaID),
        [e.target.name]: e.target.value,
      },
    });
  };

  modalOnCloseSuccess = () => {
    this.setState({
      success: false,
    });
    window.location.reload();
  };

  handleChangePagination = (e, value) => {
    this.state.page = value.activePage;
    this.fetchData();
  };

  isFirstAnswer = async () => {
    const { data: numero_de_respuestas } = await axios.get(
      `${api_url}/api/customqueries/primeraRespuesta/${this.props.match.params.preguntaID}`
    );
    numero_de_respuestas === 0
      ? await axios.put(`${api_url}/api/usuario/${this.state.usuario.userid}`, {
          useradmin: this.state.usuario.useradmin,
          userapellido: this.state.usuario.userapellido,
          useremail: this.state.usuario.useremail,
          userfechanacimiento: this.state.usuario.userfechanacimiento,
          userfoto: this.state.usuario.userfoto,
          userid: this.state.usuario.userid,
          usernick: this.state.usuario.usernick,
          usernombre: this.state.usuario.usernombre,
          userpass: this.state.usuario.userpass,
          userpuntaje: this.state.usuario.userpuntaje + 3,
          usersexo: this.state.usuario.usersexo,
        })
      : await axios.put(`${api_url}/api/usuario/${this.state.usuario.userid}`, {
          useradmin: this.state.usuario.useradmin,
          userapellido: this.state.usuario.userapellido,
          useremail: this.state.usuario.useremail,
          userfechanacimiento: this.state.usuario.userfechanacimiento,
          userfoto: this.state.usuario.userfoto,
          userid: this.state.usuario.userid,
          usernick: this.state.usuario.usernick,
          usernombre: this.state.usuario.usernombre,
          userpass: this.state.usuario.userpass,
          userpuntaje: this.state.usuario.userpuntaje + 2,
          usersexo: this.state.usuario.usersexo,
        });
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <div>Error</div>;
    return (
      <div style={{ display: "flex" }}>
        <Categoria />
        <div style={{ display: "block" }}>
          <PreguntaUsuario preguntaRespuesta={this.state.preguntaRespuesta} />
          {this.state.usuario && !this.state.preguntaRespuesta[0].estado && (
            <FormRespuesta
              formValues={this.state.respuesta}
              buttonClick={this.onSubmitRespuesta}
              evento={this.handleRespuestaChange}
              success={this.state.success}
              modalSuccessClose={this.modalOnCloseSuccess}
            />
          )}
          {this.state.usuario && this.state.preguntaRespuesta[0].estado && (
            <PreguntaCerrada />
          )}
          {!this.state.usuario && (
            <div style={{ margin: "0 3em 0 3em" }}>
              <Login nombreBoton="Responder" />
            </div>
          )}
          <RespFav respFav={this.state.respFav} />
          <DisplayRespuestas
            respuestasPregunta={this.state.respuestasPregunta.data}
            onPageChange={this.handleChangePagination}
            total={this.state.total}
            page={this.state.page}
          />
        </div>
        <Clasificacion />
      </div>
    );
  }
}

export default Respuesta;
