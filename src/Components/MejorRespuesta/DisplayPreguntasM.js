import React from "react";
import {
  Header,
  List,
  Image,
  Form,
  Modal,
  Button,
  Icon,
  Pagination,
} from "semantic-ui-react";
import {
  MainContainer,
  ListaItem,
} from "../Respuesta/EstilosDisplayRespuestas";
import { fechF } from "../utils/utils";
import "semantic-ui-css/semantic.min.css";

const DisplayRespuestas = ({
  respuestasPregunta,
  eventoPregunta,
  respuestaId,
  success,
  onclickChange,
  modalSuccessClose,
  onPageChange,
  total,
  page,
}) => {
  return (
    <MainContainer>
      <Modal
        open={success}
        size="small"
        style={{ height: 200 }}
        centered={true}
      >
        <Header icon="check circle" content="Mejor respuesta seleccionada!" />
        <Modal.Content>
          <p>
            ¿Desea seleccionar esta respuesta como <b>Mejor respuesta</b>?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={modalSuccessClose}>
            <Icon name="x" />
            Cancelar
          </Button>
          <Button color="green" onClick={onclickChange}>
            <Icon name="smile outline" />
            Aceptar
          </Button>
        </Modal.Actions>
      </Modal>
      <List>
        {respuestasPregunta.map((respuesta) => {
          var fechahorare = fechF(respuesta.respfecha, respuesta.resphora);
          return (
            <List.Item key={respuesta.respid} style={ListaItem}>
              <List.Content>
                <Header
                  style={{
                    marginBottom: "0.5em",
                    fontSize: "15px",
                  }}
                >
                  <Image
                    avatar
                    src={respuesta.userfoto}
                    style={{ width: 35, height: 35 }}
                  />
                  {respuesta.usernick}
                </Header>
                <List.Description>{respuesta.resptexto}</List.Description>
                <br />
                <List.Description
                  style={{
                    fontSize: "12px",
                    color: "lightgray",
                  }}
                >
                  {fechahorare}
                </List.Description>
                <Form>
                  <Form.Group>
                    <Form.Radio
                      toggle
                      label="Mejor respuesta"
                      value={respuesta.respid}
                      checked={respuestaId === respuesta.respid}
                      onChange={eventoPregunta}
                    />
                  </Form.Group>
                </Form>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
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
  );
};

export default DisplayRespuestas;
