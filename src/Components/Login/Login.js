import React from 'react';
import { Modal, Button, Tab } from 'semantic-ui-react';

import Tab1 from './Pane1';
import Tab2 from './Pane2';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginForm({
  eventoLogin,
  formValuesLogin,
  buttonClickLogin,
  eventoSignUp,
  formValuesSignUp,
  buttonClickSignUp,
  FailUser,
  modalOnCloseFail,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOnChange = (e, data) => {
    formValuesSignUp.usersexo = data.value;
  };

  const panes = [
    {
      menuItem: { key: 'Login', icon: 'user', content: 'Login' },
      render: () => (
        <Tab1
          eventoLogin={eventoLogin}
          formValuesLogin={formValuesLogin}
          buttonClickLogin={buttonClickLogin}
          FailUser={FailUser}
          modalOnCloseFail={modalOnCloseFail}
        />
      ),
    },
    {
      menuItem: { key: 'SignUp', icon: 'users', content: 'SignUp' },
      render: () => (
        <Tab2
          eventoSignUp={eventoSignUp}
          formValuesSignUp={formValuesSignUp}
          buttonClickSignUp={buttonClickSignUp}
          handleOnChange={handleOnChange}
        />
      ),
    },
  ];
  return (
    <div>
      <Modal
        closeIcon
        open={open}
        basic
        dimmer='blurring'
        size='small'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button color='teal'>Login</Button>}>
        <Tab
          menu={{
            style: { backgroundColor: '#283049' },
            inverted: true,
            attached: false,
            tabular: false,
          }}
          panes={panes}
        />
      </Modal>
    </div>
  );
}

export default LoginForm;
