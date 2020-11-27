import React from 'react';
import { Header, List, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {
  MainContainer,
  ListaItem,
} from '../Respuesta/EstilosDisplayRespuestas';
import { Link } from 'react-router-dom';
import { fechF } from '../utils/utils';

const PreguntaUsuario = ({ preguntaRespuesta }) => {
  //console.log(preguntaRespuesta);
  var fechahora = fechF(
    preguntaRespuesta.pregfecha,
    preguntaRespuesta.preghora
  );
  return (
    <MainContainer>
      <List>
        <List.Item key={preguntaRespuesta.pregid} style={ListaItem}>
          <Image
            avatar
            src={preguntaRespuesta.userfoto}
            style={{ width: 50, height: 50 }}
          />
          <List.Content>
            <Header style={{ marginBottom: '0.5em' }}>
              {preguntaRespuesta.pregtexto}
            </Header>
            <List.Description style={{ marginBottom: '1em' }}>
              {fechahora}
            </List.Description>
            <List.Description>{preguntaRespuesta.pregdetalle}</List.Description>
            <br />
            <Link to={`/DisplayPerfil/${preguntaRespuesta.userid}`}>
              {preguntaRespuesta.usernick}
            </Link>
          </List.Content>
        </List.Item>
      </List>
    </MainContainer>
  );
};

export default PreguntaUsuario;
