import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader/Loader';
import Categoria from '../Components/Categorias/Categorias';
import Clasificacion from '../Components/Clasificacion/Clasificacion';
import Cookies from 'universal-cookie';
import FormRespuestaEditar from '../Components/RespuestaEditar/RespuestaEditar';
import 'semantic-ui-css/semantic.min.css';
import { api_url } from '../Components/utils/utils';
import PreguntaUsuario from '../Components/Respuesta/PreguntaUsuario';
import Error from '../Components/Error/Error';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const cookies = new Cookies();

class Respuesta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: null,
      loading: true,
      usuario: cookies.get('cookie1'),
      respuesta: {},
      pregunta: {},
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
      const { data: responseRespuesta } = await axios.get(
        `${api_url}/api/respuesta/${this.props.match.params.respuestaID}`
      );
      this.setState({
        respuesta: responseRespuesta,
      });
      const { data: responsePregunta } = await axios.get(
        `${api_url}/api/customqueries/pregResp/${this.state.respuesta.pregid}`
      );
      this.setState({
        pregunta: responsePregunta,
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
        [e.target.name]: e.target.value,
      },
    });
  };
  onclickUpdate = async (e) => {
    this.setState({
      error: null,
      success: false,
    });
    try {
      const response = await axios.put(
        `${api_url}/api/respuesta/${this.props.match.params.respuestaID}`,
        {
          respid: this.state.respuesta.respid,
          userid: this.state.respuesta.userid,
          pregid: this.state.respuesta.pregid,
          resptexto: this.state.respuesta.resptexto,
          respfecha: this.state.respuesta.respfecha,
          resphora: this.state.respuesta.resphora,
        }
      );
      this.setState({
        success: true,
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
  modalOnCloseSuccess = () => {
    this.setState({
      success: false,
    });
    window.location.reload();
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;
    return (
      <div style={{ display: 'flex' }}>
        <Categoria />
        <div style={{ display: 'block' }}>
          <PreguntaUsuario preguntaRespuesta={this.state.pregunta} />
          <FormRespuestaEditar
            formValues={this.state.respuesta}
            buttonClick={this.onclickUpdate}
            evento={this.handleRespuestaChange}
            success={this.state.success}
            modalSuccessClose={this.modalOnCloseSuccess}
          />
        </div>
        <Clasificacion />
      </div>
    );
  }
}

export default Respuesta;
