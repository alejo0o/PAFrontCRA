import React from 'react';
import { Header, List, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {
  MainContainer,
  ListaItem1,
} from '../Respuesta/EstilosDisplayRespuestas';
import { fechF } from '../utils/utils';
import { Link } from 'react-router-dom';

const RespFav = ({ respFav }) => {
  var fechahorare = fechF(respFav.respfecha, respFav.resphora);
  return (
    <MainContainer>
      <List>
        <List.Item key={respFav.respid} style={ListaItem1}>
          <List.Content>
            <Link to={`/DisplayPerfil/${respFav.userid}`}>
              <Header
                style={{
                  marginBottom: '0.5em',
                  fontSize: '15px',
                }}>
                <Image
                  avatar
                  src={respFav.userfoto}
                  style={{ width: 35, height: 35 }}
                />
                {respFav.usernick}
              </Header>
            </Link>
            <List.Description
              style={{
                fontSize: '12px',
                color: 'lightgray',
              }}>
              <i className='trophy icon'></i>
              Mejor respFav
            </List.Description>
            <br />
            <List.Description>{respFav.resptexto}</List.Description>
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
      </List>
    </MainContainer>
  );
};

export default RespFav;
