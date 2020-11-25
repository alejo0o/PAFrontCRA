import React from 'react';
import {
  Grid,
  Header,
  Icon,
  Tab,
  Table,
  Button,
  Modal,
} from 'semantic-ui-react';
import { MainContainer } from './EstilosPerfil';
import { fecha } from '../utils/utils';
import EditRespuesta from './EditRespuesta';

function PreguntasUsuario({ respuestasData, eventoEdit, buttonEdit }) {
  const [open, setOpen] = React.useState(false);

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
              Respuestas
            </Header>
            <br />
            <Grid>
              <Table color='blue'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Pregunta</Table.HeaderCell>
                    <Table.HeaderCell>Respuesta</Table.HeaderCell>
                    <Table.HeaderCell>Fecha de publicación</Table.HeaderCell>
                    <Table.HeaderCell>Estado</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {respuestasData.map((respuesta) => {
                    var fechaF = fecha(respuesta.respfecha);
                    var estado = 'Abierta';
                    if (respuesta.pregestado) {
                      estado = 'Cerrada';
                    }
                    return (
                      <Table.Row key={respuesta.respid}>
                        <Table.Cell collapsing>
                          {respuesta.pregtexto}
                        </Table.Cell>
                        <Table.Cell>{respuesta.resptexto}</Table.Cell>
                        <Table.Cell>{fechaF}</Table.Cell>
                        <Table.Cell>{estado}</Table.Cell>
                        <Table.Cell>
                          {!respuesta.pregestado && (
                            <Modal
                              closeIcon
                              open={open}
                              basic
                              dimmer='blurring'
                              size='small'
                              onClose={() => setOpen(false)}
                              onOpen={() => setOpen(true)}
                              trigger={
                                <Button icon>
                                  <Icon name='edit' />
                                </Button>
                              }>
                              <EditRespuesta
                                respuesta={respuesta}
                                buttonEdit={buttonEdit}
                                eventoEdit={eventoEdit}
                              />
                            </Modal>
                          )}
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

export default PreguntasUsuario;
