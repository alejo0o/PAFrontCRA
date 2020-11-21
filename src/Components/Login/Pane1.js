import React from 'react';
import { Form, Grid, Header, Icon, Tab, Label } from 'semantic-ui-react';
import { MainContainer } from './EstilosLogin';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Pane1 = ({ eventoLogin, formValuesLogin, buttonClickLogin }) => {
  return (
    <Tab.Pane style={{ backgroundColor: ' #dae5ed' }}>
      <MainContainer style={{ margin: 'auto' }}>
        <Grid>
          <Grid.Column style={{ maxWidth: 600 }}>
            <Header as='h2' textAlign='center'>
              <Icon
                circular
                inverted
                name='users'
                style={{ fontSize: '0.7em' }}
              />
              Log-in
            </Header>
            <Form size='large' onSubmit={buttonClickLogin}>
              {/* <Segment stacked> */}
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='Nickname'
                  placeholder='Nickname'
                  onChange={eventoLogin}
                  type='nick'
                  name='usernick'
                  value={formValuesLogin.usernick}
                  required
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  label='Contraseña'
                  placeholder='Contraseña'
                  type='password'
                  onChange={eventoLogin}
                  name='userpass'
                  value={formValuesLogin.userpass}
                  required
                />
              </Form.Group>
              <Form.Group>
                {window.undefined === cookies.get('cookie2') && (
                  <Label basic color='black'>
                    <Icon name='info circle' />
                    Ingrese su nickname y contraseña
                  </Label>
                )}
                {window.undefined !== cookies.get('cookie2') && (
                  <Label basic color='black'>
                    <Icon name='info circle' />
                    {cookies.get('cookie2').error}
                  </Label>
                )}
              </Form.Group>
              <Form.Button
                fluid
                size='large'
                style={{
                  backgroundColor: '#283049',
                  color: '#FFF',
                }}>
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
