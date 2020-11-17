import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../Components/Spinner/Spinner';
import DisplayPreguntas from '../Components/DisplayPreguntas/DisplayPreguntas';
import Categorias from '../Components/Categorias/Categorias';
import Puntajes from '../Components/Clasificacion/Clasificacion';
//Styles
import { PreguntaIndexContainer } from '../Components/Layout/EstilosGlobales';
import { api_url } from '../Components/utils/utils';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      data: {
        pregid: 0,
        pregtexto: 0,
        pregdetalle: '',
        pregfecha: '',
        catnombre: '',
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
      const { data: preguntasAleatorias } = await axios.get(
        `${api_url}/api/customqueries/getpreguntasaleatorias`
      );
      this.setState({
        data: preguntasAleatorias,
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
    if (this.state.error) return <div>Error</div>;
    return (
      <div>
        <PreguntaIndexContainer>
          <Categorias></Categorias>
          <DisplayPreguntas preguntasAleatorias={this.state.data.data} />
          <Puntajes></Puntajes>
        </PreguntaIndexContainer>
      </div>
    );
  }
}

export default Main;
