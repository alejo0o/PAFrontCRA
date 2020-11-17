import React from 'react';
import { Header, Container, List, Image, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {
  MainContainer,
  ListaItem,
} from '../DisplayPreguntas/EstilosDisplayPreguntas';
import { Link } from 'react-router-dom';

const DisplayPreguntas = ({ preguntasAleatorias }) => {
  return (
    <MainContainer>
      <List>
        {preguntasAleatorias.map((pregunta) => (
          <List.Item style={ListaItem} key={pregunta.pregid}>
            <List.Icon>
              <i className='thumbs up icon'></i>
            </List.Icon>
            <List.Content>
              <Link
                key={pregunta.pregid}
                to={`/respuesta/${pregunta.pregid}`}
                style={{ textDecoration: 'none', color: 'black' }}>
                <Header style={{ marginBottom: '0.5em' }}>
                  {pregunta.pregtexto}
                </Header>
              </Link>
              <List.Description>{pregunta.pregdetalle}</List.Description>
              <br />
              <Link to='#' style={{ textDecoration: 'none', color: 'black' }}>
                {pregunta.catnombre}
              </Link>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </MainContainer>
  );
};

export default DisplayPreguntas;
