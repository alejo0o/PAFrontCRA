import React from 'react';
import { Header, List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {
  MainContainer,
  ListaItem,
} from '../DisplayCategorias/EstilosDisplayCategorias';
import { Link } from 'react-router-dom';

const DisplayCategorias = ({ pregCategoria, categoria }) => {
  return (
    <MainContainer>
      <List>
        <List.Item key={categoria.catid} style={ListaItem}>
          <List.Content>
            <Header style={{ marginBottom: '0.5em' }}>
              {categoria.catnombre}
            </Header>
            <List.Description>{categoria.catdescripcion}</List.Description>
          </List.Content>
        </List.Item>
      </List>

      <List>
        {pregCategoria.map((pregunta) => {
          var fechre = pregunta.pregfecha;
          var fechapre = fechre.substring(0, 10);

          var horapre =
            pregunta.preghora.hours +
            'h ' +
            pregunta.preghora.minutes +
            'm ' +
            pregunta.preghora.seconds +
            's';

          var fechahorapre = fechapre + '\t' + horapre;
          return (
            <List.Item key={pregunta.pregid} style={ListaItem}>
              <List.Icon>
                <i className='question icon'></i>
              </List.Icon>

              <List.Content>
                <Link
                  key={pregunta.pregid}
                  to={`/respuesta/${pregunta.pregid}`}
                  style={{ textDecoration: 'none', color: 'black' }}>
                  <Header
                    style={{
                      marginBottom: '0.5em',
                      fontSize: '15px',
                    }}>
                    {pregunta.pregtexto}
                  </Header>
                </Link>

                <List.Description>{pregunta.pregdetalle}</List.Description>
                <br />
                <List.Description
                  style={{
                    fontSize: '12px',
                    color: 'lightgray',
                  }}>
                  {fechahorapre}
                </List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </MainContainer>
  );
};

export default DisplayCategorias;
