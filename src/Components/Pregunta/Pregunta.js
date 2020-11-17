import React from 'react';
import {
  Button,
  Form,
  Header,
  Segment,
  Container,
  Dropdown,
  DropdownItem,
  Select,
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
