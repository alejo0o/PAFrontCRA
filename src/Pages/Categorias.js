import React, { Component } from "react";
import axios from "axios";
import Loader from "../Components/Spinner/Spinner";
import DisplayCategorias from "../Components/DisplayCategorias/DisplayCategorias";
import { api_url } from "../Components/utils/utils";
import CategoriasList from "../Components/Categorias/Categorias";
import Puntajes from "../Components/Clasificacion/Clasificacion";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const getServerSideProps = async (ctx) => {
  const { data: pregCategoria } = await axios.get(
    `https://localhost:5001/api/customqueries/pregCategoria/${ctx.query.catid}`
  );
  const { data: categoria } = await axios.get(
    `https://localhost:5001/api/categoria/${ctx.query.catid}`
  );
  return {
    props: {
      pregCategoria,
      categoria,
    },
  };
};

class Categorias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      pregCategoria: {},
      categoria: {},
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
        `${api_url}/api/customqueries/pregCategoria/${new URLSearchParams(
          this.props.location.search
        ).get("catid")}`
      );
      const { data: categoria } = await axios.get(
        `${api_url}/api/categoria/${new URLSearchParams(
          this.props.location.search
        ).get("catid")}`
      );
      this.setState({
        pregCategoria: preguntasAleatorias,
        categoria: categoria,
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
      <div style={{ display: "flex" }}>
        <CategoriasList />
        <DisplayCategorias
          pregCategoria={this.state.pregCategoria.data}
          categoria={this.state.categoria}
        />
        <Puntajes />
      </div>
    );
  }
}

export default Categorias;
