import React from "react";
import {
  Grid,
  Header,
  Tab,
  Image,
  Table,
  Modal,
  Button,
} from "semantic-ui-react";
import { MainContainer } from "./EstilosPerfil";
import Cookies from "universal-cookie";
import UsuarioUpdate from "./UsuarioUpdate";
import { fecha } from "../utils/utils";
import "semantic-ui-css/semantic.min.css";

function UsuarioPerfil({
  eventoUpdate,
  formValuesUpdate,
  buttonClickUpdate,
  eventoUpdatePassword,
  updatePassword,
  cambiadoErroneo,
  onCloseModales,
  handleOnChangeFoto,
}) {
  const [open, setOpen] = React.useState(false);
  const cookies = new Cookies();
  const user = cookies.get("cookie1");
  const fechaF = fecha(user.userfechanacimiento);
  return (
    <Tab.Pane style={{ backgroundColor: " #dae5ed" }}>
      <MainContainer style={{ margin: "auto" }}>
        <Grid>
          <Grid.Column style={{ maxWidth: "auto" }}>
            <Header as="h2" textAlign="center">
              <i className="user icon"></i>
              Perfil
            </Header>
            <Grid>
              <Grid.Column width={4}>
                <Image src={user.userfoto} />
              </Grid.Column>
              <Grid.Column width={9}>
                <Table definition>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width={4}>Nombre</Table.Cell>
                      <Table.Cell width={8}>{user.usernombre}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Apellido</Table.Cell>
                      <Table.Cell>{user.userapellido}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Nickname</Table.Cell>
                      <Table.Cell>{user.usernick}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Fecha de nacimiento</Table.Cell>
                      <Table.Cell>{fechaF}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Género</Table.Cell>
                      <Table.Cell>{user.usersexo}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Email</Table.Cell>
                      <Table.Cell>{user.useremail}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Puntaje</Table.Cell>
                      <Table.Cell>{user.userpuntaje}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </MainContainer>
      <Modal
        closeIcon
        open={open}
        basic
        dimmer="blurring"
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ marginTop: "20%", marginLeft: "20%" }}
        trigger={
          <Button
            attached="bottom"
            fluid
            size="large"
            style={{
              backgroundColor: "#283049",
              color: "#FFF",
            }}
          >
            Editar
          </Button>
        }
      >
        <UsuarioUpdate
          handleOnChangeFoto={handleOnChangeFoto}
          eventoUpdate={eventoUpdate}
          formValuesUpdate={formValuesUpdate}
          buttonClickUpdate={buttonClickUpdate}
          eventoUpdatePassword={eventoUpdatePassword}
          updatePassword={updatePassword}
          cambiadoErroneo={cambiadoErroneo}
          onCloseModales={onCloseModales}
        />
      </Modal>
    </Tab.Pane>
  );
}

export default UsuarioPerfil;
