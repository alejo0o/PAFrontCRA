import React, { Component } from "react";
import axios from "axios";
import Loader from "../Components/Loader/Loader";
import DisplayPreguntas from "../Components/DisplayPreguntas/DisplayPreguntas";
import Categorias from "../Components/Categorias/Categorias";
import Puntajes from "../Components/Clasificacion/Clasificacion";
//Styles
import { PreguntaIndexContainer } from "../Components/Layout/EstilosGlobales";
import { api_url } from "../Components/utils/utils";
import Error from "../Components/Error/Error";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      data: {
        pregid: 0,
        pregtexto: 0,
        pregdetalle: "",
        pregfecha: "",
        catnombre: "",
      },
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
      const { data: preguntasAleatorias } = await axios.get(
        `${api_url}/api/customqueries/getpreguntasaleatorias?pageNumber=${this.state.page}`
      );
      this.setState({
        data: preguntasAleatorias,
        loading: false,
        error: null,
        //total de paginas
        total: preguntasAleatorias.totalPages,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  handleChangePagination = (e, value) => {
    this.state.page = value.activePage;
    this.fetchData();
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;
    return (
      <div>
        <PreguntaIndexContainer>
          <Categorias></Categorias>
          <DisplayPreguntas
            preguntasAleatorias={this.state.data.data}
            activePage={this.state.activePage}
            onPageChange={this.handleChangePagination}
            total={this.state.total}
            page={this.state.page}
          />
          <Puntajes></Puntajes>
        </PreguntaIndexContainer>
      </div>
    );
  }
}

export default Main;
