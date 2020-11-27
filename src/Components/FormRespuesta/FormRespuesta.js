import React from "react";
import { Button, Form, Header, Segment, Modal, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { SendButton } from "../Pregunta/EstilosPregunta";

const FormRespuesta = ({
  evento,
  formValues,
  buttonClick,
  success,
  modalSuccessClose,
}) => {
  return (
    <div style={{ padding: "0em 3em 0em 3em" }}>
      {/*Modal para la pregunta success*/}
      <Modal
        closeIcon
        open={success}
        size="small"
        style={{ height: 200 }}
        centered={true}
      >
        <Header
          icon="check circle"
          content="Respuesta ingresada satisfactoriamente!"
        />
        <Modal.Content>
          <p>
            Tu respuesta se ha ingresado correctamente, continua ayudando a
            otras personas y acumulando puntos.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={modalSuccessClose}>
            <Icon name="smile outline" /> Ok!
          </Button>
        </Modal.Actions>
      </Modal>
      <Form size="large" onSubmit={buttonClick}>
        <Segment stacked style={{ padding: "30px" }}>
          <Form.TextArea
            style={{ height: 100, fontSize: "large" }}
            placeholder="Agrega información detallada en tu respuesta"
            onChange={evento}
            name="resptexto"
            value={formValues.resptexto}
            required
          />
          <Button color="blue" fluid={true} size="large" style={SendButton}>
            Enviar
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

export default FormRespuesta;
