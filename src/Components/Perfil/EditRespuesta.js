import React, { useState } from "react";
import { Form, Icon, Tab, Header, FormGroup } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function EditRespuesta({
  respuestaModificada,
  editarRespuestaAction,
  respuestaID,
  preguntaID,
  respuestaTexto,
  userID,
  respuestaCompleta,
}) {
  const [resptexto, setresptexto] = useState("");

  const handleChange = (e) => {
    setresptexto(e.target.value);
  };

  const handleSubmit = () => {
    editarRespuestaAction(respuestaID, userID, preguntaID, resptexto);
  };

  return (
    <Tab.Pane style={{ backgroundColor: " #dae5ed" }}>
      <Header as="h2" textAlign="center">
        <Icon circular inverted name="edit" style={{ fontSize: "0.7em" }} />
        Editar Respuesta
      </Header>
      <Form size="large" onSubmit={handleSubmit}>
        {/* <Segment stacked> */}
        <Form.Group widths="equal">
          <Form.TextArea
            label="Respuesta"
            placeholder="Respuesta"
            onChange={handleChange}
            value={respuestaCompleta.resptexto}
            name="resptexto"
            required
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
      </Form>
    </Tab.Pane>
  );
}

export default EditRespuesta;
