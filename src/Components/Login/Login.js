import React from "react";
import { Modal, Button, Tab, Header, Icon } from "semantic-ui-react";

import Tab1 from "./Pane1";
import Tab2 from "./Pane2";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginForm({
  eventoLogin,
  formValuesLogin,
  buttonClickLogin,
  eventoSignUp,
  formValuesSignUp,
  buttonClickSignUp,
  FailUser,
  modalOnCloseFail,
  nombreBoton,
  usuarioErrorSignup,
  usuarioCreado,
  nick_del_usuario,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOnChange = (e, data) => {
    formValuesSignUp.usersexo = data.value;
  };

  const panes = [
    {
      menuItem: { key: "Login", icon: "user", content: "Login" },
      render: () => (
        <Tab1
          eventoLogin={eventoLogin}
          formValuesLogin={formValuesLogin}
          buttonClickLogin={buttonClickLogin}
          FailUser={FailUser}
          modalOnCloseFail={modalOnCloseFail}
        />
      ),
    },
    {
      menuItem: { key: "SignUp", icon: "users", content: "SignUp" },
      render: () => (
        <Tab2
          eventoSignUp={eventoSignUp}
          formValuesSignUp={formValuesSignUp}
          buttonClickSignUp={buttonClickSignUp}
          handleOnChange={handleOnChange}
        />
      ),
    },
  ];
  return (
    <div>
      <Modal
        closeIcon
        open={open}
        basic
        dimmer="blurring"
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button color="teal">{nombreBoton}</Button>}
      >
        <Tab
          menu={{
            style: { backgroundColor: "#283049" },
            inverted: true,
            attached: false,
            tabular: false,
          }}
          panes={panes}
        />
        {/*Modal para la pregunta warning*/}
        <Modal
          closeIcon
          open={usuarioErrorSignup}
          size="small"
          style={{ height: 200 }}
        >
          <Header icon="remove circle" content="Ups! Hubo un error" />
          <Modal.Content>
            <p>
              El usuario con nick {nick_del_usuario} no pudo ser creado, el nick
              del usuario ya esta en uso o el nick contiene caracteres
              especiales.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={modalOnCloseFail}>
              <Icon name="checkmark" /> Ok!
            </Button>
          </Modal.Actions>
        </Modal>
        {/*Modal para la pregunta success*/}
        <Modal
          closeIcon
          open={usuarioCreado}
          size="small"
          style={{ height: 200 }}
        >
          <Header
            icon="check circle"
            content="Usuario creado satisfactoriamente!"
          />
          <Modal.Content>
            <p>
              El usuario con nick {nick_del_usuario} se ha creado exitosamente,
              comienza a responder o hacer preguntas.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={modalOnCloseFail}>
              <Icon name="smile outline" /> Ok!
            </Button>
          </Modal.Actions>
        </Modal>
        {/*Formulario de pregunta estructura */}
      </Modal>
    </div>
  );
}

export default LoginForm;
