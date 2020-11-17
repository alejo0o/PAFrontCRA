import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../Components/Spinner/Spinner';
import DisplayRespuestas from '../Components/Respuesta/DisplayRespuestas';
import PreguntaUsuario from '../Components/Respuesta/PreguntaUsuario';
import RespFav from '../Components/Respuesta/RespFav';
import Categoria from '../Components/Categorias/Categorias';
import Clasificacion from '../Components/Clasificacion/Clasificacion';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

class Respuesta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      respuestasPregunta: {
        respid: '',
        respfecha: '',
        resptexto: '',
        resphora: {},
        usernick: '',
        userfoto: '',
      },
      preguntaRespuesta: {
        pregid: '',
        pregtexto: '',
        pregdetalle: '',
        pregfecha: '',
        preghora: {},
        pregmejorresp: '',
        usernick: '',
        userfoto: '',
      },
      respFav: {
        respid: '',
        respfecha: '',
        resptexto: '',
        resphora: {},
        usernick: '',
        userfoto: '',
      },
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
        `https://localhost:5001/api/customqueries/respPregunta/${this.props.match.params.preguntaID}`
      );
      const { data: preguntaRespuesta } = await axios.get(
        `https://localhost:5001/api/customqueries/pregResp/${this.props.match.params.preguntaID}`
      );
      const { data: respFav } = await axios.get(
        `https://localhost:5001/api/customqueries/respFav/${this.props.match.params.preguntaID}`
      );
      this.setState({
        preguntaRespuesta: preguntaRespuesta,
        respuestasPregunta: respuestasPregunta,
        respFav: respFav,
        loading: false,
      });
    } catch (error) {
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
      <div style={{ display: 'flex' }}>
        <Categoria />
        <div style={{ display: 'block' }}>
          <PreguntaUsuario preguntaRespuesta={this.state.preguntaRespuesta} />
          <RespFav respFav={this.state.respFav} />
          <DisplayRespuestas
            respuestasPregunta={this.state.respuestasPregunta.data}
          />
        </div>
        <Clasificacion />
      </div>
    );
  }
}

export default Respuesta;
