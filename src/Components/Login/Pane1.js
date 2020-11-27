import React from "react";
import {
  Form,
  Grid,
  Header,
  Icon,
  Tab,
  Modal,
  Button,
} from "semantic-ui-react";
import { MainContainer } from "./EstilosLogin";
import Cookies from "universal-cookie";
import "semantic-ui-css/semantic.min.css";

const cookies = new Cookies();

const Pane1 = ({
  eventoLogin,
  formValuesLogin,
  buttonClickLogin,
  FailUser,
  modalOnCloseFail,
}) => {
  return (
    <Tab.Pane style={{ backgroundColor: " #dae5ed" }}>
      <MainContainer style={{ margin: "auto" }}>
        <Grid>
          <Grid.Column style={{ maxWidth: 600 }}>
            <Header as="h2" textAlign="center">
              <Icon
                circular
                inverted
                name="users"
                style={{ fontSize: "0.7em" }}
              />
              Log-in
            </Header>
            <Form size="large" onSubmit={buttonClickLogin}>
              {/* <Segment stacked> */}
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Nickname"
                  placeholder="Nickname"
                  onChange={eventoLogin}
                  type="nick"
                  name="usernick"
                  value={formValuesLogin.usernick}
                  required
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Contraseña"
                  placeholder="Contraseña"
                  type="password"
                  onChange={eventoLogin}
                  name="userpass"
                  value={formValuesLogin.userpass}
                  required
                />
              </Form.Group>
              {/*Modal de exito de login */}
              <Modal
                closeIcon
                open={FailUser}
                size="small"
                style={{ height: 200 }}
                centered={true}
              >
                <Header icon="ban" content="Usuario o contraseña incorrecta!" />
                <Modal.Content>
                  <p>
                    Las credenciales ingresadas no son correctas, porfavor
                    revise la información ingresada o contacte con el
                    administrador.
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="green" onClick={modalOnCloseFail}>
                    <Icon name="remove circle" /> Ok!
                  </Button>
                </Modal.Actions>
              </Modal>
              {/*Fin del modal */}
              <Form.Button
                fluid
                size="large"
                style={{
                  backgroundColor: "#283049",
                  color: "#FFF",
                }}
              >
                Login
              </Form.Button>
              {/* </Segment> */}
            </Form>
          </Grid.Column>
        </Grid>
      </MainContainer>
    </Tab.Pane>
  );
};

export default Pane1;
