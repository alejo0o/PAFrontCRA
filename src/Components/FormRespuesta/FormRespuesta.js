import React from 'react';
import { Container, Button, Form, Header, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { SendButton } from '../Pregunta/EstilosPregunta';

const FormRespuesta = ({ evento, formValues, buttonClick }) => {
  return (
    <div style={{ padding: '0em 3em 0em 3em' }}>
      <Form size='large' onSubmit={buttonClick}>
        <Segment stacked style={{ padding: '30px' }}>
          <Form.TextArea
            style={{ height: 100, fontSize: 'large' }}
            placeholder='Quieres añadir más información? Incluir información detallada ayuda a los usuarios a dar mejores respuestas'
            onChange={evento}
            name='pregdetalle'
            value={formValues.pregdetalle}
            required
          />
          <Button color='blue' fluid={true} size='large' style={SendButton}>
            Enviar
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

export default FormRespuesta;
