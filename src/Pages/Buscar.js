import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import Loader from "../Components/Spinner/Spinner";
import DisplayPreguntas from "../Components/DisplayPreguntas/DisplayPreguntas";
import Categorias from "../Components/Categorias/Categorias";
import Clasificacion from "../Components/Clasificacion/Clasificacion";
//Styles
import { PreguntaIndexContainer } from "../Components/Layout/EstilosGlobales";
import { api_url } from "../Components/utils/utils";

class Buscar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      preguntas: {
        pregid: "",
        userid: "",
        catid: "",
        pregtexto: "",
        pregdetalle: "",
        catnombre: "",
        pregfecha: "",
        preghora: {
          ticks: "",
          days: "",
          hours: "",
          milliseconds: "",
          minutes: "",
          seconds: "",
          totalDays: "",
          totalHours: "",
          totalMilliseconds: "",
          totalMinutes: "",
          totalSeconds: "",
        },
        pregestado: false,
        pregmejorresp: null,
        cat: null,
        user: null,
        respuesta: [],
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
      const { data } = await axios.get(
        `${api_url}/api/customqueries/getBuscar/${encodeURIComponent(
          new URLSearchParams(this.props.location.search).get("buscar")
        )}`
      );
      this.setState({
        preguntas: data,
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
    if (this.state.error) return <div>no olvides ingresar tu busqueda</div>;
    return (
      <div>
        <PreguntaIndexContainer>
          <Categorias />
          <DisplayPreguntas preguntasAleatorias={this.state.preguntas.data} />
          <Clasificacion />
        </PreguntaIndexContainer>
      </div>
    );
  }
}

export default Buscar;
