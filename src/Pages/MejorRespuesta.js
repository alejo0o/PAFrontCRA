import React, { Component } from "react";
import axios from "axios";
import Loader from "../Components/Loader/Loader";
import DisplayRespuestas from "../Components/MejorRespuesta/DisplayPreguntasM";
import PreguntaUsuario from "../Components/Respuesta/PreguntaUsuario";
import RespFav from "../Components/Respuesta/RespFav";
import Categoria from "../Components/Categorias/Categorias";
import Clasificacion from "../Components/Clasificacion/Clasificacion";
import { api_url } from "../Components/utils/utils";
import Cookies from "universal-cookie";
import Error from "../Components/Error/Error";

class Respuesta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      success: false,
      warning: false,

      cookies: new Cookies(),

      respuestasPregunta: {
        respid: "",
        respfecha: "",
        resptexto: "",
        resphora: {},
        usernick: "",
        userfoto: "",
      },
      preguntaRespuesta: {
        pregid: "",
        pregtexto: "",
        pregdetalle: "",
        pregfecha: "",
        preghora: {},
        pregmejorresp: "",
        usernick: "",
        userfoto: "",
      },
      respFav: {
        respid: "",
        respfecha: "",
        resptexto: "",
        resphora: {},
        usernick: "",
        userfoto: "",
      },
      respuestaId: "",
      pregunta: {},
      usuario: {},
      respuesta: {},
      usuarioPregunta: {},
      //paginador
      page: 1,
      total: 0,
    };
  }
  componentDidMount() {
    this.fetchData();
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
      const { data: responsePregunta } = await axios.get(
        `${api_url}/api/pregunta/${this.props.match.params.preguntaID}`
      );
      this.setState({
        preguntaRespuesta: preguntaRespuesta,
        respuestasPregunta: respuestasPregunta,
        respFav: respFav,
        pregunta: responsePregunta,
        loading: false,
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
  handleChange = async (e, { value }) => {
    this.setState({
      success: true,
      respuestaId: value,
      error: null,
    });
  };
  modalOnCloseSuccess = () => {
    this.setState({
      success: false,
    });
    // window.location.reload();
  };
  handleChangePagination = (e, value) => {
    this.state.page = value.activePage;
    this.fetchData();
  };
  onclickChange = async (e) => {
    this.setState({
      loading: true,
      error: null,
      success: false,
    });

    try {
      // e.preventDefault();
      const response = await axios.put(
        `${api_url}/api/pregunta/${this.props.match.params.preguntaID}`,
        {
          pregid: this.state.pregunta.pregid,
          userid: this.state.pregunta.userid,
          catid: this.state.pregunta.catid,
          catnombre: this.state.pregunta.catnombre,
          pregtexto: this.state.pregunta.pregtexto,
          pregdetalle: this.state.pregunta.pregdetalle,
          pregfecha: this.state.pregunta.pregfecha,
          preghora: this.state.pregunta.preghora,
          pregestado: this.state.pregunta.pregestado,
          pregmejorresp: this.state.respuestaId,
          pregmulta: this.state.pregunta.pregmulta,
        }
      );
      const { data: respuesta } = await axios.get(
        `${api_url}/api/respuesta/${this.state.respuestaId}`
      );
      const { data: usuario } = await axios.get(
        `${api_url}/api/usuario/${respuesta.userid}`
      );
      this.setState({
        loading: false,
        error: null,
        respuesta: respuesta,
        usuario: usuario,
      });
      const responseU = await axios.put(
        `${api_url}/api/usuario/${usuario.userid}`,
        {
          userid: this.state.usuario.userid,
          usernombre: this.state.usuario.usernombre,
          userapellido: this.state.usuario.userapellido,
          usernick: this.state.usuario.usernick,
          useremail: this.state.usuario.useremail,
          userfoto: this.state.usuario.userfoto,
          usersexo: this.state.usuario.usersexo,
          useradmin: this.state.usuario.useradmin,
          userpuntaje: this.state.usuario.userpuntaje + 8,
          userfechanacimiento: this.state.usuario.userfechanacimiento,
          userpass: this.state.usuario.userpass,
        }
      );
      const { data: usuarioPregunta } = await axios.get(
        `${api_url}/api/usuario/${this.state.cookies.get("cookie1").userid}`
      );
      this.setState({
        usuarioPregunta: usuarioPregunta,
        loading: false,
        error: null,
      });
      this.state.cookies.set("cookie1", this.state.usuarioPregunta, {
        path: "/",
      });
      window.location.reload();
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;
    return (
      <div style={{ display: "flex" }}>
        <Categoria />
        <div style={{ display: "block" }}>
          <PreguntaUsuario preguntaRespuesta={this.state.preguntaRespuesta} />
          <RespFav respFav={this.state.respFav} />
          <DisplayRespuestas
            respuestasPregunta={this.state.respuestasPregunta.data}
            eventoPregunta={this.handleChange}
            success={this.state.success}
            onclickChange={this.onclickChange}
            modalSuccessClose={this.modalOnCloseSuccess}
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
