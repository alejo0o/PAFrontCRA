import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader/Loader';
import DisplayCategorias from '../Components/DisplayCategorias/DisplayCategorias';
import { api_url } from '../Components/utils/utils';
import CategoriasList from '../Components/Categorias/Categorias';
import Puntajes from '../Components/Clasificacion/Clasificacion';
import Error from '../Components/Error/Error';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const getServerSideProps = async (ctx) => {
  const { data: pregCategoria } = await axios.get(
    `${api_url}/api/customqueries/pregCategoria/${ctx.query.catid}`
  );
  const { data: categoria } = await axios.get(
    `${api_url}/api/categoria/${ctx.query.catid}`
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
        `${api_url}/api/customqueries/pregCategoria/${new URLSearchParams(
          this.props.location.search
        ).get('catid')}?pageNumber=${this.state.page}`
      );
      const { data: categoria } = await axios.get(
        `${api_url}/api/categoria/${new URLSearchParams(
          this.props.location.search
        ).get('catid')}`
      );
      this.setState({
        pregCategoria: preguntasAleatorias,
        categoria: categoria,
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
      <div style={{ display: 'flex' }}>
        <CategoriasList />
        <DisplayCategorias
          pregCategoria={this.state.pregCategoria.data}
          categoria={this.state.categoria}
          onPageChange={this.handleChangePagination}
          total={this.state.total}
          page={this.state.page}
        />
        <Puntajes />
      </div>
    );
  }
}

export default Categorias;
