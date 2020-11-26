import React from "react";
import { Link } from "react-router-dom";

import {
  Grid,
  Header,
  Icon,
  Tab,
  Table,
  Button,
  Pagination,
} from "semantic-ui-react";
import { MainContainer } from "./EstilosPerfil";
import { fecha } from "../utils/utils";
import "semantic-ui-css/semantic.min.css";

function PreguntasUsuario({
  respuestasData,
  editarRespuestaHandleChange,
  editarRespuestaAction,
  respuestaModificada,
  onPageChange,
  total,
  page,
}) {
  return (
    <Tab.Pane style={{ backgroundColor: " #dae5ed" }}>
      <MainContainer style={{ margin: "auto" }}>
        <Grid>
          <Grid.Column style={{ maxWidth: "auto" }}>
            <Header as="h2" textAlign="center">
              <i className="talk icon"></i>
              Respuestas
            </Header>
            <br />
            <Grid>
              <Table color="blue">
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
                    var estado = "Abierta";
                    if (respuesta.pregestado) {
                      estado = "Cerrada";
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
                            <Link to={`/respuestaEditar/${respuesta.respid}`}>
                              <Button
                                size="large"
                                fluid
                                style={{
                                  backgroundColor: "#283049",
                                  color: "#FFF",
                                }}
                              >
                                <Icon name="edit" />
                              </Button>
                            </Link>
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
        <br />
        <div
          style={{
            display: "flex",
            margin: "auto",
            justifyContent: "center",
          }}
        >
          <Pagination
            onPageChange={onPageChange}
            pointing
            secondary
            activePage={page}
            totalPages={total}
          />
        </div>
      </MainContainer>
    </Tab.Pane>
  );
}

export default PreguntasUsuario;
