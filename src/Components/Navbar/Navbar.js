import React, { Component, useState } from 'react';
import { Navbar, FormControl, Nav, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Login from '../Login/LoginClass';
import { withRouter } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Icon, Label } from 'semantic-ui-react';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const NavBar = (props) => {
  const cookies = new Cookies();
  const [buscar, setbuscar] = useState('');
  const handleChange = (e) => {
    //maneja el cambio en el componente hijo y setea los valores a las variables de estado
    setbuscar(encodeURIComponent(e.target.value));
  };

  const OnSubmitBuscar = (e) => {
    e.preventDefault();
    props.history.push(`/buscar?buscar=${buscar}`);
    window.location.reload();
  };

  const onClickButtonLogout = async (e) => {
    cookies.remove('cookie1');
    props.history.push(`/`);
    window.location.reload();
  };
  return (
    <Navbar expand='lg' style={{ backgroundColor: '#dae5ed' }}>
      <Navbar.Brand href='#home'>TASBP</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Link to='/' className='nav-link'>
            Home
          </Link>
        </Nav>
        <Nav>
          <Form inline onChange={handleChange} onSubmit={OnSubmitBuscar}>
            <FormControl
              type='text'
              placeholder='Buscar'
              className='mr-sm-2'
              name='buscar'
              required
            />

            <Button variant='outline-success' type='submit' className='mr-1'>
              Buscar
            </Button>
          </Form>
        </Nav>
        {window.undefined === cookies.get('cookie1') && (
          <Nav>
            <Login />
          </Nav>
        )}
        {window.undefined !== cookies.get('cookie1') && (
          <Nav>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret id='profileDropDown'>
                <img
                  src={cookies.get('cookie1').userfoto}
                  alt='Profile'
                  className='nav-user-profile rounded-circle'
                  width='50'
                  style={{ paddingRight: '0.5em' }}
                />
                <Label circular color='grey'>
                  {cookies.get('cookie1').usernick}&nbsp;&nbsp;&nbsp;
                  <Icon name='star' />
                  {cookies.get('cookie1').userpuntaje}
                </Label>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  // tag={RouterNavLink}
                  // to="/profile"
                  className='dropdown-profile'>
                  <a
                    href='/perfil'
                    style={{ color: 'black', textDecoration: 'none' }}>
                    <Icon
                      fitted
                      name='user circle'
                      style={{ paddingRight: '0.5em' }}
                    />
                    Perfil
                  </a>
                </DropdownItem>
                <DropdownItem id='qsLogoutBtn' onClick={onClickButtonLogout}>
                  <Icon
                    fitted
                    name='toggle off'
                    style={{ paddingRight: '0.5em' }}
                  />
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavBar);
