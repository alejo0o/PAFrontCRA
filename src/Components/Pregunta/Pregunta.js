import React from 'react';
import {
  Container,
  Button,
  Form,
  Header,
  Segment,
  Modal,
  Icon,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {
  FormInput1,
  TextArea,
  SendButton,
  ListDropdown,
} from './EstilosPregunta';
import { MainContainer } from './EstilosPregunta';

const Pregunta = ({
  evento,
  formValues,
  buttonClick,
  categorias,
  dropDownChange,
  warning,
  modalOnClose,
  success,
  usuarioPuntaje,
  modalSuccessClose,
}) => {
  const ListCategorias = [];
  categorias.map((categoria) => {
    ListCategorias.push({
      key: categoria.catid,
      text: categoria.catnombre,
      value: categoria.catid,
    });
  });
  return (
    <MainContainer>
      {/*Modales*/}
      {/*Modal para la pregunta warning*/}
      <Modal closeIcon open={warning} size='small' style={{ height: 200 }}>
        <Header icon='remove circle' content='Ups! Hubo un error' />
        <Modal.Content>
          <p>
            Tu puntaje es de <strong>{usuarioPuntaje}</strong> puntos por lo que
            no puedes realizar más preguntas responde las preguntas de otros
            participantes para ganar puntos.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={modalOnClose}>
            <Icon name='checkmark' /> Ok!
          </Button>
        </Modal.Actions>
      </Modal>
      {/*Modal para la pregunta success*/}
      <Modal closeIcon open={success} size='small' style={{ height: 200 }}>
        <Header
          icon='check circle'
          content='Pregunta ingresada satisfactoriamente!'
        />
        <Modal.Content>
          <p>
            Tu pregunta se ha ingresado correctamente, responde otras preguntas
            para ganar puntos y ayudar a otras personas.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={modalSuccessClose}>
            <Icon name='smile outline' /> Ok!
          </Button>
        </Modal.Actions>
      </Modal>
      {/*Formulario de pregunta estructura */}
      <Form size='large' onSubmit={buttonClick}>
        <Segment stacked style={{ padding: '30px' }}>
          <Header
            as='h2'
            color='grey'
            textAlign='left'
            style={{ display: 'flex' }}>
            <i className='user circle icon'></i>
            <Form.Dropdown
              placeholder={'Sexualidad'}
              name='dropdown'
              style={ListDropdown}
              options={ListCategorias}
              onChange={dropDownChange}
              required
            />
          </Header>

          <Form.Input
            placeholder='Qué pregunta tienes?'
            style={FormInput1}
            onChange={evento}
            name='pregtexto'
            value={formValues.pregtexto}
            required
          />
          <Form.TextArea
            style={TextArea}
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
    </MainContainer>
  );
};

export default Pregunta;
