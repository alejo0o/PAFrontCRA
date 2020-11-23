import React, { Component } from "react";
import axios from "axios";
import Loader from "../Components/Spinner/Spinner";
import DisplayRespuestas from "../Components/MejorRespuesta/DisplayPreguntasM";
import PreguntaUsuario from "../Components/Respuesta/PreguntaUsuario";
import RespFav from "../Components/Respuesta/RespFav";
import Categoria from "../Components/Categorias/Categorias";
import Clasificacion from "../Components/Clasificacion/Clasificacion";
import { api_url } from "../Components/utils/utils";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class Respuesta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
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
      preguntaUpdate: {
        pregid: "",
        userid: "",
        catid: "",
        catnombre: "",
        pregtexto: "",
        pregdetalle: "",
        pregfecha: "",
        preghora: {},
        pregestado: "",
        pregmejorresp: "",
        pregmulta: "",
      },
    };
  }
  componentDidMount() {
    this.fetchData();
    this.updatePregunta();
  }

  fetchData = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const { data: respuestasPregunta } = await axios.get(
        `https://localhost:5001/api/customqueries/respPregunta/${this.props.match.params.preguntaID}`
      );
      const { data: preguntaRespuesta } = await axios.get(
        `https://localhost:5001/api/customqueries/pregResp/${this.props.match.params.preguntaID}`
      );
      const { data: respFav } = await axios.get(
        `https://localhost:5001/api/customqueries/respFav/${this.props.match.params.preguntaID}`
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
  updatePregunta = () => {
    this.setState({
      pregunta: {
        ...this.state.pregunta,
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
      },
    });
  };
  handleChange = async (e, { value }) => {
    this.setState({ respuestaId: value });
    this.setState({
      loading: true,
      error: null,
    });
    // console.log(this.state.preguntaUpdate.userid, "user");
    console.log(this.state.preguntaUpdate, "preguntaup");
    console.log(this.state.pregunta);

    try {
      // e.preventDefault();
      const response = await axios.put(
        `${api_url}/api/pregunta/${this.props.match.params.preguntaID}`,
        this.state.pregunta
      );
      this.setState({
        loading: false,
        error: null,
      });
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
            respuestaId={this.state.respuestaId}
          />
        </div>
        <Clasificacion />
      </div>
    );
  }
}

export default Respuesta;
