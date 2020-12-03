import React, { Component } from 'react';
import { Segment, List, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { MainContainer, ItemsLista } from './EstilosCategorias';
import Error from '../Error/Error';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { api_url } from '../utils/utils';

class Categorias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      categorias: {
        catid: '',
        catnombre: '',
        catdescripcion: '',
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
      const { data } = await axios.get(`${api_url}/api/categoria`);
      this.setState({
        categorias: data,
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
    if (this.state.error) return <Error />;

    return (
      <MainContainer>
        <Segment>
          <Header style={{ padding: '1em 0em 0em 1em' }}>
            Todas las categorías
          </Header>
          <List style={{ padding: '1em' }}>
            {this.state.categorias.data.map((categoria) => (
              <ItemsLista key={categoria.catid}>
                <List.Item>
                  <a
                    href={`/categorias?catid=${categoria.catid}`}
                    style={{ color: 'black', textDecoration: 'none' }}>
                    {categoria.catnombre}
                  </a>
                </List.Item>
              </ItemsLista>
            ))}
          </List>
        </Segment>
      </MainContainer>
    );
  }
}

export default Categorias;
