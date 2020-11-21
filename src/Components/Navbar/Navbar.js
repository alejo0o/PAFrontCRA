import React, { Component, useState } from 'react';
import { Navbar, FormControl, Nav, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import Login from '../Login/LoginClass';
import { withRouter } from 'react-router-dom';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const NavBar = (props) => {
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

            <Button variant='outline-success' type='submit'>
              Buscar
            </Button>
          </Form>
        </Nav>
        <Nav>
          <Login />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavBar);
