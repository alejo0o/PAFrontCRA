import React from 'react';
import { DropdownItem } from 'reactstrap';
import { Icon } from 'semantic-ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UsuarioAdmin = () => {
  return (
    <>
      <DropdownItem className='dropdown-profile'>
        <a
          href='/administracion/categorias'
          style={{ color: 'black', textDecoration: 'none' }}>
          <Icon fitted name='certificate' style={{ paddingRight: '0.5em' }} />
          Categorías
        </a>
      </DropdownItem>
      <DropdownItem className='dropdown-profile'>
        <a
          href='/administracion/preguntas'
          style={{ color: 'black', textDecoration: 'none' }}>
          <Icon
            fitted
            name='question circle'
            style={{ paddingRight: '0.5em' }}
          />
          Preguntas
        </a>
      </DropdownItem>
      <DropdownItem className='dropdown-profile'>
        <a
          href='/administracion/respuestas'
          style={{ color: 'black', textDecoration: 'none' }}>
          <Icon fitted name='exclamation' style={{ paddingRight: '0.5em' }} />
          Respuestas
        </a>
      </DropdownItem>
      <DropdownItem className='dropdown-profile'>
        <a
          href='/administracion/usuarios'
          style={{ color: 'black', textDecoration: 'none' }}>
          <Icon fitted name='user plus' style={{ paddingRight: '0.5em' }} />
          Usuarios
        </a>
      </DropdownItem>
    </>
  );
};

export default UsuarioAdmin;
