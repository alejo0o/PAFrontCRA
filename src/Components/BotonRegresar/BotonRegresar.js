import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const Retorno = (props) => {
  return (
    <div>
      <Button content='Regresar' primary onClick={props.history.goBack} />
    </div>
  );
};

export default withRouter(Retorno);
