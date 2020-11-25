import React from 'react';
import { Form, Icon, Tab, Header, FormGroup } from 'semantic-ui-react';

function EditRespuesta({ respuesta, buttonEdit, eventoEdit }) {
  return (
    <Tab.Pane style={{ backgroundColor: ' #dae5ed' }}>
      <Header as='h2' textAlign='center'>
        <Icon circular inverted name='edit' style={{ fontSize: '0.7em' }} />
        Editar Respuesta
      </Header>
      <Form size='large' onSubmit={buttonEdit}>
        {/* <Segment stacked> */}
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label='Respuesta'
            placeholder='Respuesta'
            onChange={eventoEdit}
            name='resptexto'
            value={respuesta.resptexto}
            required
          />
        </Form.Group>
        <FormGroup widths='equal'>
          <Form.Button
            fluid
            size='large'
            style={{
              backgroundColor: '#283049',
              color: '#FFF',
            }}>
            Editar
          </Form.Button>
        </FormGroup>
      </Form>
    </Tab.Pane>
  );
}

export default EditRespuesta;
