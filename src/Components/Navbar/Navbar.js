import React, { useState } from 'react';
import { Navbar, FormControl, Nav, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ComponentNavbar = () => {
  const [buscar, setbuscar] = useState('?');
  const handleChange = (e) => {
    //maneja el cambio en el componente hijo y setea los valores a las variables de estado
    setbuscar(encodeURIComponent(e.target.value));
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
          <Form inline onChange={handleChange}>
            <FormControl
              type='text'
              placeholder='Buscar'
              className='mr-sm-2'
              name='buscar'
            />
            <a href={`/buscar?buscar=${buscar}`}>
              <Button variant='outline-success'>Buscar</Button>
            </a>
          </Form>
        </Nav>
        <Nav>
          <Link
            to='/'
            className='btn btn-primary ml-2'
            style={{ width: '8em' }}>
            Log In
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ComponentNavbar;
