import React from "react";
import { Form, Icon, Header, Tab, Button, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
function Password({
  eventoUpdate,
  eventoUpdatePassword,
  updatePassword,

  cambiadoErroneo,
  onCloseModales,
}) {
  return (
    <Tab.Pane style={{ backgroundColor: " #dae5ed" }}>
      <Header as="h2" textAlign="center">
        <Icon circular inverted name="user" style={{ fontSize: "0.7em" }} />
        Cambiar contraseña
      </Header>
      <Form size="large" onSubmit={updatePassword}>
        <Form.Group widths="equal" inline>
          <Form.Input
            fluid
            label="Contraseña anterior"
            placeholder="Contraseña anterior"
            // type={hidden ? "password" : "text"}
            onChange={eventoUpdatePassword}
            name="passwordAnterior"
            required
            // value={formValuesUpdate.userpass}
          />
        </Form.Group>
        <Form.Group widths="equal" inline>
          <Form.Input
            fluid
            label="Contraseña nueva"
            placeholder="Contraseña nueva"
            // type={hidden ? "password" : "text"}
            onChange={eventoUpdate}
            name="userpass"
            required
            // value={formValuesUpdate.userpass}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Button
            size="large"
            style={{
              backgroundColor: "#283049",
              color: "#FFF",
            }}
          >
            Cambiar
          </Button>
        </Form.Group>
      </Form>
      {/*Modal para la opcion warning*/}
      <Modal
        closeIcon
        open={cambiadoErroneo}
        size="small"
        style={{ height: 200, marginTop: "20%", marginLeft: "20%" }}
      >
        <Header icon="remove circle" content="Ups! Hubo un error" />
        <Modal.Content>
          <p>Las contraseñas no coinciden</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={onCloseModales}>
            <Icon name="checkmark" /> Ok!
          </Button>
        </Modal.Actions>
      </Modal>
    </Tab.Pane>
  );
}

export default Password;
