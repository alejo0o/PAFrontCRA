import React from "react";
import { Grid, Header, Tab, Table, Pagination } from "semantic-ui-react";
import { MainContainer } from "./EstilosPerfil";
import { fechF } from "../utils/utils";

function Mensajeusuario({ mensajedata, onPageChange, total, page }) {
  //var fecha = fechF(mensaje.menfecha,mensaje.menhora);
  return (
    <Tab.Pane style={{ backgroundColor: " #dae5ed" }}>
      <MainContainer style={{ margin: "auto" }}>
        <Grid>
          <Grid.Column style={{ maxWidth: "auto" }}>
            <Header as="h2" textAlign="center">
              <i className="inbox icon"></i>
              Mensajes
            </Header>
            <br />
            <Grid>
              <Table color="blue">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Asunto</Table.HeaderCell>
                    <Table.HeaderCell>Contenido</Table.HeaderCell>
                    <Table.HeaderCell>Remitente/Admin</Table.HeaderCell>
                    <Table.HeaderCell>Fecha/Hora de Emisión</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {mensajedata.map((mensaje) => {
                    return (
                      <Table.Row key={mensaje.menid}>
                        <Table.Cell>{mensaje.mentitulo}</Table.Cell>
                        <Table.Cell>{mensaje.mendetalle}</Table.Cell>
                        <Table.Cell>{mensaje.adminnombre}</Table.Cell>
                        <Table.Cell>
                          {fechF(mensaje.menfecha, mensaje.menhora)}
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

export default Mensajeusuario;
