import React from 'react';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const PreguntaCaducada = () => {
  return (
    <div
      style={{
        margin: '0 3em 0 3em',
        width: '600px',
        textAlign: 'center',

        paddingLeft: '6em',
        display: 'flex',
      }}>
      <Icon name='remove circle' size='huge' />
      <h3>
        UPS! La pregunta fue cerrada. Responde otras preguntas y ayuda a más
        personas.
      </h3>
    </div>
  );
};

export default PreguntaCaducada;
