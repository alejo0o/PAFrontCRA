import React from 'react';
import {
  Form,
  Grid,
  Header,
  Icon,
  Modal,
  Button,
  Tab,
} from 'semantic-ui-react';
import { MainContainer, MainContainerS } from './EstilosLogin';
import {
  validateEmail,
  validateFoto,
  validateNick,
  validateRequired,
  options,
} from './ValidateFunctions';

const Pane2 = ({
  eventoSignUp,
  formValuesSignUp,
  buttonClickSignUp,
  handleOnChange,
}) => {
  return (
    <Tab.Pane style={{ backgroundColor: ' #dae5ed' }}>
      <MainContainerS style={{ margin: 'auto' }}>
        <Grid>
          <Grid.Column style={{ maxWidth: 700 }}>
            <Header as='h2' textAlign='center'>
              <Icon
                circular
                inverted
                name='users'
                style={{ fontSize: '0.7em' }}
              />
              Sign-up
            </Header>
            <Form onSubmit={buttonClickSignUp}>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='Nombre'
                  placeholder='Nombre'
                  onChange={eventoSignUp}
                  name='usernombre'
                  value={formValuesSignUp.usernombre}
                  error={validateRequired(formValuesSignUp.usernombre)}
                  required
                />
                <Form.Input
                  fluid
                  label='Apellido'
                  placeholder='Apellido'
                  onChange={eventoSignUp}
                  name='userapellido'
                  value={formValuesSignUp.userapellido}
                  error={validateRequired(formValuesSignUp.userapellido)}
                  required
                />
                <Form.Input
                  fluid
                  label='Nickname'
                  placeholder='Nickname'
                  onChange={eventoSignUp}
                  name='usernick'
                  value={formValuesSignUp.usernick}
                  error={validateNick(formValuesSignUp.usernick)}
                  required
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='Fecha de nacimiento'
                  placeholder='Fecha de nacimiento'
                  onChange={eventoSignUp}
                  type='date'
                  name='userfechanacimiento'
                  value={formValuesSignUp.userfechanacimiento}
                  required
                />

                <Form.Select
                  fluid
                  label='Género'
                  options={options}
                  placeholder='Masculino'
                  onChange={handleOnChange}
                  name='usersexo'
                  selection
                  required
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='Email'
                  placeholder='Email'
                  onChange={eventoSignUp}
                  type='email'
                  name='useremail'
                  value={formValuesSignUp.useremail}
                  error={validateEmail(formValuesSignUp.useremail)}
                  required
                />
                <Form.Input
                  fluid
                  label='Contraseña'
                  placeholder='Contraseña'
                  type='password'
                  onChange={eventoSignUp}
                  name='userpass'
                  value={formValuesSignUp.userpass}
                  error={validateRequired(formValuesSignUp.userpass)}
                  required
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='Foto'
                  placeholder='Foto'
                  onChange={eventoSignUp}
                  name='userfoto'
                  value={formValuesSignUp.userfoto}
                  error={validateFoto(formValuesSignUp.userfoto)}
                  required
                />
              </Form.Group>
              <Form.Button
                fluid
                size='large'
                style={{ backgroundColor: '#283049', color: '#FFF' }}>
                Registrarse
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </MainContainerS>
    </Tab.Pane>
  );
};

export default Pane2;
