import React from 'react';
import { Grid, Header, Icon, Tab, Image, Table } from 'semantic-ui-react';
import { MainContainer } from './EstilosDisplayPerfil';
import { fecha } from '../utils/utils';

function DisplayPerfil({ usuario, numpreg, numresp }) {
  const fechaF = fecha(usuario.userfechanacimiento);
  return (
    <Tab.Pane>
      <MainContainer style={{ margin: 'auto' }}>
        <Grid>
          <Grid.Column style={{ maxWidth: 'auto' }}>
            <Header as='h2' textAlign='center'>
              <Icon
                circular
                inverted
                name='book'
                style={{ fontSize: '0.7em' }}
              />
              {usuario.usernick}
            </Header>
            <Grid>
              <Grid.Column width={4}>
                <Image src={usuario.userfoto} />
              </Grid.Column>
              <Grid.Column width={9}>
                <Table definition>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Fecha de nacimiento</Table.Cell>
                      <Table.Cell>{fechaF}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Género</Table.Cell>
                      <Table.Cell>{usuario.usersexo}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Puntaje</Table.Cell>
                      <Table.Cell>{usuario.userpuntaje}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Preguntas Realizadas</Table.Cell>
                      <Table.Cell>{numpreg}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Respuestas a preguntas</Table.Cell>
                      <Table.Cell>{numresp}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </MainContainer>
    </Tab.Pane>
  );
}

export default DisplayPerfil;
