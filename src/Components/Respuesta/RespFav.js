import React from 'react';
import { Header, Container, List, Image, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {
  MainContainer,
  ListaItem,
  ListaItem1,
} from '../Respuesta/EstilosDisplayRespuestas';
import { fechF } from '../utils/utils';

const RespFav = ({ respFav }) => {
  return (
    <MainContainer>
      <List>
        {respFav.map((respuesta) => {
          var fechahorare = fechF(respuesta.respfecha, respuesta.resphora);
          return (
            <List.Item key={respuesta.respid} style={ListaItem1}>
              <List.Content>
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
                <List.Description
                  style={{
                    fontSize: '12px',
                    color: 'lightgray',
                  }}>
                  <i className='trophy icon'></i>
                  Mejor Respuesta
                </List.Description>
                <br />
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

export default RespFav;
