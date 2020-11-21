import React from "react";
import { Grid, Header, Icon, Tab, Table } from "semantic-ui-react";
import { MainContainer } from "./EstilosPerfil";

function PreguntasUsuario({ preguntasData }) {
  return (
    <Tab.Pane style={{ backgroundColor: " #dae5ed" }}>
      <MainContainer style={{ margin: "auto" }}>
        <Grid>
          <Grid.Column style={{ maxWidth: "auto" }}>
            <Header as="h2" textAlign="center">
              <Icon
                circular
                inverted
                name="user"
                style={{ fontSize: "0.7em" }}
              />
              Preguntas
            </Header>
            <Grid>
              <Table color="blue">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Pregunta</Table.HeaderCell>
                    <Table.HeaderCell>Categoria</Table.HeaderCell>
                    <Table.HeaderCell>Fecha de publicación</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {preguntasData.map((pregunta) => (
                    <Table.Row key={pregunta.pregid}>
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

export default PreguntasUsuario;
