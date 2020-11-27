import React, { Component } from 'react';
import { List, Image, Header, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {
  MainContainer,
  ListItem,
  ContainerDescription,
} from './EstilosClasificacion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { api_url } from '../utils/utils';
import Error from '../Error/Error';

class Clasificacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      puntajes: {
        id: '',
        foto: '',
        nick: '',
        puntaje: '',
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
        `${api_url}/api/customqueries/ordenarusuarios`
      );

      this.setState({
        puntajes: data,
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
      <div>
        <div
          style={{
            margin: 'auto',
            width: '60%',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '2em',
          }}>
          <Link to={`/pregunta`}>
            <Button
              size='large'
              fluid
              style={{ backgroundColor: '#283049', color: '#FFF' }}>
              Preguntar
            </Button>
          </Link>
        </div>
        <MainContainer>
          <Header>Tabla de clasificaciones</Header>
          <ContainerDescription>
            <p style={{ marginLeft: '2em' }}>Usuario</p>
            <p style={{ marginLeft: '8em' }}>Puntos</p>
          </ContainerDescription>
          <List ordered>
            {this.state.puntajes.map((usuario) => (
              <a
                href={`/DisplayPerfil/${usuario.id}`}
                key={usuario.id}
                style={{ textDecoration: 'none', color: 'black' }}>
                <List.Item style={ListItem}>
                  <List.Content style={{ display: 'flex' }}>
                    <Image avatar src={usuario.foto} />
                    <List.Header style={{ marginRight: 'auto' }}>
                      {usuario.nick}
                    </List.Header>
                    <List.Description>{usuario.puntaje}</List.Description>
                  </List.Content>
                </List.Item>
              </a>
            ))}
          </List>
        </MainContainer>
      </div>
    );
  }
}

export default Clasificacion;
