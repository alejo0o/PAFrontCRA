import React from 'react';
import { Header, Segment, Icon, Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Login from '../Login/LoginClass';

const Logearse = () => {
  return (
    <Container style={{ marginTop: '3em', width: 800 }}>
      <Segment>
        <Header>
          <strong>¡Hola! te damos la bienvenida</strong>
        </Header>
        <p>
          <strong>TASBP</strong> es la mejor página para compartir tu
          conocimiento y ayudar a otras personas. Para una mejor experiencia
          inicia sesión y comienza a preguntar y responder a otros usuarios.
        </p>
        <Login />
      </Segment>
    </Container>
  );
};

export default Logearse;
