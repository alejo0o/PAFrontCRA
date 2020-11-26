import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Tab, Table, Button } from 'semantic-ui-react';
import { MainContainer } from './EstilosPerfil';
import { fecha } from '../utils/utils';

function PreguntasCerradasUsuario({ preguntasData }) {
  return (
    <Tab.Pane style={{ backgroundColor: ' #dae5ed' }}>
      <MainContainer style={{ margin: 'auto' }}>
        <Grid>
          <Grid.Column style={{ maxWidth: 'auto' }}>
            <Header as='h2' textAlign='center'>
              <i className='question circle outline icon'></i>
              Preguntas Cerradas
            </Header>
            <br />
            <Grid>
              <Table color='blue'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Pregunta</Table.HeaderCell>
                    <Table.HeaderCell>Categoría</Table.HeaderCell>
                    <Table.HeaderCell>Fecha de publicación</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {preguntasData.map((pregunta) => {
                    console.log(preguntasData);
                    var fechaF = fecha(pregunta.pregfecha);
                    return (
                      <Table.Row key={pregunta.pregid}>
                        <Table.Cell>{pregunta.pregtexto}</Table.Cell>
                        <Table.Cell>{pregunta.pregcategoria}</Table.Cell>
                        <Table.Cell>{fechaF}</Table.Cell>
                        <Table.Cell>
                          <Link to={`/mejorRespuesta/${pregunta.pregid}`}>
                            <Button
                              size='large'
                              fluid
                              style={{
                                backgroundColor: '#283049',
                                color: '#FFF',
                              }}>
                              Mejor respuesta
                            </Button>
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </Grid>
          </Grid.Column>
        </Grid>
      </MainContainer>
    </Tab.Pane>
  );
}

export default PreguntasCerradasUsuario;
