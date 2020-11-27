import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader/Loader';
import DisplayPerfil from '../Components/DisplayPerfil/DisplayPerfil';
import Categorias from '../Components/Categorias/Categorias';
import Puntajes from '../Components/Clasificacion/Clasificacion';
//Styles
import { PreguntaIndexContainer } from '../Components/Layout/EstilosGlobales';
import { api_url } from '../Components/utils/utils';
import Error from '../Components/Error/Error';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

class PerfilDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
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
      const { data: usuario } = await axios.get(
        `${api_url}/api/Usuario/${this.props.match.params.Userid}`
      );

      const { data: numpreg } = await axios.get(
        `${api_url}/api/customqueries/Countpreguntas/${this.props.match.params.Userid}`
      );

      const { data: numresp } = await axios.get(
        `${api_url}/api/customqueries/Countrespuesta/${this.props.match.params.Userid}`
      );

      this.setState({
        usuario: usuario,
        numpreg: numpreg,
        numresp: numresp,
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
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;
    return (
      <div>
        <PreguntaIndexContainer>
          <Categorias></Categorias>
          <DisplayPerfil
            usuario={this.state.usuario}
            numpreg={this.state.numpreg}
            numresp={this.state.numresp}
          />
          <Puntajes></Puntajes>
        </PreguntaIndexContainer>
      </div>
    );
  }
}

export default PerfilDisplay;
