import React, { Component } from "react";
import { Segment, List, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { MainContainer, ItemsLista } from "./EstilosCategorias";

import axios from "axios";
import Loader from "../Spinner/Spinner";

class Categorias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      categorias: {
        catid: "",
        catnombre: "",
        catdescripcion: "",
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
      const { data } = await axios.get("https://localhost:5001/api/categoria");
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
    if (this.state.error) return <div>Error</div>;

    return (
      <MainContainer>
        <Segment>
          <Header style={{ padding: "1em 0em 0em 1em" }}>
            Todas las categorías
          </Header>
          <List style={{ padding: "1em" }}>
            {this.state.categorias.data.map((categoria) => (
              <ItemsLista key={categoria.catid}>
                <List.Item>
                  <a
                    href={`/categorias?catid=${categoria.catid}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
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
