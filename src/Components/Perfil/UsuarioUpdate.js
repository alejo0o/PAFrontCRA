import React from "react";
import { Form, Icon, Tab, Header } from "semantic-ui-react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const user = cookies.get("cookie1");

function UsuarioUpdate({ eventoUpdate, formValuesUpdate, buttonClickUpdate }) {
  const [hidden, setHidden] = React.useState(true);

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
        <Form.Group widths="equal" inline>
          <Form.Input
            fluid
            label="Contraseña"
            placeholder="Contraseña"
            type={hidden ? "password" : "text"}
            onChange={eventoUpdate}
            name="userpass"
            value={formValuesUpdate.userpass}
          />
          <Icon
            name="eye"
            circular
            inverted
            width={2}
            onClick={() => setHidden(!hidden)}
            style={{ cursor: "pointer" }}
          ></Icon>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Foto"
            placeholder="Foto"
            onChange={eventoUpdate}
            type="foto"
            name="userfoto"
            value={formValuesUpdate.userfoto}
          />
        </Form.Group>
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
        {/* </Segment> */}
      </Form>
    </Tab.Pane>
  );
}

export default UsuarioUpdate;
