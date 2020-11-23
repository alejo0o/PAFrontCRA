import React from 'react';
import { Grid, Header, Icon, Tab, Table } from 'semantic-ui-react';
import { MainContainer } from './EstilosPerfil';

function Mensajeusuario({ mensajedata }) {
  return (
    <Tab.Pane style={{ backgroundColor: ' #dae5ed' }}>
      <MainContainer style={{ margin: 'auto' }}>
        <Grid>
          <Grid.Column style={{ maxWidth: 'auto' }}>
            <Header as='h2' textAlign='center'>
              <Icon
                circular
                inverted
                name='user'
                style={{ fontSize: '0.7em' }}
              />
              Mesanjes
            </Header>
            <Grid>
              <Table color='blue'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Mensaje</Table.HeaderCell>
                    <Table.HeaderCell>Contenido</Table.HeaderCell>
                    <Table.HeaderCell>Remitente</Table.HeaderCell>
                    <Table.HeaderCell>Fecha de Emisión</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {mensajedata.map((mensaje) => (
                    <Table.Row key={mensaje.menid}>
                      <Table.Cell>pregunta.pregtexto</Table.Cell>
                      <Table.Cell>pregunta.pregfecha</Table.Cell>
                      <Table.Cell>pregunta.catnombre</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid>
          </Grid.Column>
        </Grid>
      </MainContainer>
    </Tab.Pane>
  );
}

export default Mensajeusuario;
