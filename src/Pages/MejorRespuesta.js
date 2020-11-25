import React, { Component } from "react";
import axios from "axios";
import Loader from "../Components/Spinner/Spinner";
import DisplayRespuestas from "../Components/MejorRespuesta/DisplayPreguntasM";
import PreguntaUsuario from "../Components/Respuesta/PreguntaUsuario";
import RespFav from "../Components/Respuesta/RespFav";
import Categoria from "../Components/Categorias/Categorias";
import Clasificacion from "../Components/Clasificacion/Clasificacion";
import { api_url } from "../Components/utils/utils";
import Cookies from "universal-cookie";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class Respuesta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
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
        `${api_url}/api/customqueries/respPregunta/${this.props.match.params.preguntaID}`
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
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  handleChange = async (e, { value }) => {
    this.setState({ respuestaId: value });
    this.setState({
      loading: true,
      error: null,
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
          pregmejorresp: value,
          pregmulta: this.state.pregunta.pregmulta,
        }
      );
      const { data: respuesta } = await axios.get(
        `https://localhost:5001/api/respuesta/${value}`
      );
      const { data: usuario } = await axios.get(
        `https://localhost:5001/api/usuario/${respuesta.userid}`
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
      this.state.cookies.set("cookie1", this.state.usuario, { path: "/" });
      window.location.reload();
    } catch (error) {
      console.log(error);

      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <div>Error</div>;
    return (
      <div style={{ display: "flex" }}>
        <Categoria />
        <div style={{ display: "block" }}>
          <PreguntaUsuario preguntaRespuesta={this.state.preguntaRespuesta} />
          <RespFav respFav={this.state.respFav} />
          <DisplayRespuestas
            respuestasPregunta={this.state.respuestasPregunta.data}
            eventoPregunta={this.handleChange}
          />
        </div>
        <Clasificacion />
      </div>
    );
  }
}

export default Respuesta;
