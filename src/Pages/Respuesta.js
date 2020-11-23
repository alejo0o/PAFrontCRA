import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../Components/Spinner/Spinner';
import DisplayRespuestas from '../Components/Respuesta/DisplayRespuestas';
import PreguntaUsuario from '../Components/Respuesta/PreguntaUsuario';
import RespFav from '../Components/Respuesta/RespFav';
import Categoria from '../Components/Categorias/Categorias';
import Clasificacion from '../Components/Clasificacion/Clasificacion';
import Cookies from 'universal-cookie';
import FormRespuesta from '../Components/FormRespuesta/FormRespuesta';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const cookies = new Cookies();

class Respuesta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      usuario: cookies.get('cookie1'),
      respuestasPregunta: {},
      preguntaRespuesta: {},
      respFav: {},
      respuesta: {
        userid: '',
        pregid: '',
        resptexto: '',
      },
    };
  }
  componentDidMount() {
    this.fetchData();
    if (this.state.usuario)
      this.setState({
        respuesta: {
          userid: this.state.usuario.userid,
          pregid: this.props.match.params.preguntaID,
          resptexto: '',
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
  onSubmitRespuesta = (e) => {};
  handleRespuestaChange = (e) => {};

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <div>Error</div>;
    return (
      <div style={{ display: 'flex' }}>
        <Categoria />
        <div style={{ display: 'block' }}>
          <PreguntaUsuario preguntaRespuesta={this.state.preguntaRespuesta} />
          {this.state.usuario && (
            <FormRespuesta
              formValues={this.state.respuesta}
              buttonClick={this.onSubmitRespuesta}
              evento={this.handleRespuestaChange}
            />
          )}
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
