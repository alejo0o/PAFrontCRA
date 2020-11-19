import React from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Login from '../Login/Login';

const Logearse = () => {
  return (
    <Segment>
      <Header>
        <strong>¡Hola! te damos la bienvenida</strong>
      </Header>
      <p>
        <strong>TASBP</strong> es la mejor página para compartir tu conocimiento
        y ayudar a otras personas. Para una mejor experiencia inicia sesión y
        comienza a preguntar y responder a otros usuarios.
      </p>
      <Login
        eventoLogin={this.handleChangeLogin}
        formValuesLogin={this.state.usuarioLogin}
        buttonClickLogin={this.onClickButtonLogin}
        eventoSignUp={this.handleChangeSignUp}
        formValuesSignUp={this.state.usuarioSignUp}
        buttonClickSignUp={this.onClickButtonSignUp}
        buttonClickLogout={this.onClickButtonLogout}
      />
    </Segment>
  );
};

export default Logearse;
