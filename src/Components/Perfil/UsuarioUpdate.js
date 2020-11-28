import React from "react";
import { Form, Icon, Tab, Header, FormGroup } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function UsuarioUpdate({
  eventoUpdate,
  formValuesUpdate,
  buttonClickUpdate,

  handleOnChangeFoto,
}) {
  return (
    <Tab.Pane style={{ backgroundColor: " #dae5ed" }}>
      <Header as="h2" textAlign="center">
        <Icon circular inverted name="user" style={{ fontSize: "0.7em" }} />
        Actualizar datos
      </Header>
      <Form size="large" onSubmit={buttonClickUpdate}>
        {/* <Segment stacked> */}
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Email"
            placeholder="Email"
            onChange={eventoUpdate}
            type="email"
            name="useremail"
            value={formValuesUpdate.useremail}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            fluid
            type="file"
            label="Foto"
            placeholder="Foto"
            accept="image/*"
            onChange={handleOnChangeFoto}
          />
        </Form.Group>
        <FormGroup widths="equal">
          <Form.Button
            fluid
            size="large"
            style={{
              backgroundColor: "#283049",
              color: "#FFF",
            }}
          >
            Editar
          </Form.Button>
        </FormGroup>
        {/* </Segment> */}
      </Form>
    </Tab.Pane>
  );
}

export default UsuarioUpdate;
