import React from 'react';
import { Header, List, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {
  MainContainer,
  ListaItem,
} from '../Respuesta/EstilosDisplayRespuestas';
import { fechF } from '../utils/utils';
import { Link } from 'react-router-dom';

const DisplayRespuestas = ({ respuestasPregunta }) => {
  return (
    <MainContainer>
      <List>
        {respuestasPregunta.map((respuesta) => {
          var fechahorare = fechF(respuesta.respfecha, respuesta.resphora);
          return (
            <List.Item key={respuesta.respid} style={ListaItem}>
              <List.Content>
                <Link to={`/DisplayPerfil/${respuesta.userid}`}>
                  <Header
                    style={{
                      marginBottom: '0.5em',
                      fontSize: '15px',
                    }}>
                    <Image
                      avatar
                      src={respuesta.userfoto}
                      style={{ width: 35, height: 35 }}
                    />
                    {respuesta.usernick}
                  </Header>
                </Link>

                <List.Description>{respuesta.resptexto}</List.Description>
                <br />
                <List.Description
                  style={{
                    fontSize: '12px',
                    color: 'lightgray',
                  }}>
                  {fechahorare}
                </List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </MainContainer>
  );
};

export default DisplayRespuestas;
