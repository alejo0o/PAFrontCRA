import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import { prueba } from './EstilosFooter';
import 'bootstrap-css-only/css/bootstrap.min.css';

//import "mdbreact/dist/css/mdb.css";

const FooterPage = () => {
  return (
    <MDBFooter className='font-small pt-4 mt-4' style={prueba}>
      <MDBContainer fluid className='text-center text-md-left' style={prueba}>
        <MDBRow style={prueba}>
          <MDBCol md='4'>
            <h5 className='title'>Recursos</h5>
            <ul>
              <li className='list-unstyled'>
                <i className='code icon'></i>
                <a
                  href='https://github.com/alejo0o/YahooFrontend'
                  rel='noopener noreferrer'
                  target='_blank'>
                  FrontEnd
                </a>
              </li>
              <li className='list-unstyled'>
                <i className='code icon'></i>
                <a
                  href='https://github.com/alejo0o/YahooBackEnd'
                  rel='noopener noreferrer'
                  target='_blank'>
                  BackEnd
                </a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md='4'>
            <h5 className='title'>Información general</h5>
            <ul>
              <li className='list-unstyled'>
                <a href='#!'>Acerca de nosotros</a>
              </li>
              <li className='list-unstyled'>
                <a href='#!'>Términos de uso</a>
              </li>
              <li className='list-unstyled'>
                <a href='#!'>Política de Privacidad</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md='4'>
            <h5 className='title'>Contacto</h5>
            <ul>
              <li className='list-unstyled'>
                <a href='BSPAT@abcd.com'>BSPAT@abcd.com</a>
              </li>
              <li className='list-unstyled'>+593 987654321</li>
              <li className='list-unstyled'>Quito-Ecuador</li>
            </ul>
          </MDBCol>
        </MDBRow>
        <MDBRow style={prueba}>
          <MDBCol md='3'></MDBCol>
          <MDBCol md='6'>
            <MDBRow style={prueba}>
              <MDBCol md='2'>
                <a
                  href='https://www.linkedin.com/in/alejandro-manuel-vivanco-mosquera-646625116/'
                  rel='noopener noreferrer'
                  target='_blank'
                  className='btnFooterCRA'
                  style={{ textDecoration: 'none' }}>
                  <i
                    className='big  linkedin icon'
                    style={{ lineHeight: '2em' }}></i>
                </a>
              </MDBCol>
              <MDBCol md='2'>
                <a
                  href='https://www.instagram.com/zapatathalia/'
                  rel='noopener noreferrer'
                  target='_blank'
                  className='btnFooterCRA'
                  style={{ textDecoration: 'none' }}>
                  <i
                    className='big instagram icon'
                    style={{ lineHeight: '2em' }}></i>
                </a>
              </MDBCol>
              <MDBCol md='2'>
                <a
                  href='https://www.facebook.com/santiago.cordova.165/'
                  rel='noopener noreferrer'
                  target='_blank'
                  className='btnFooterCRA'
                  style={{ textDecoration: 'none' }}>
                  <i
                    className='big facebook icon'
                    style={{ lineHeight: '2em' }}></i>
                </a>
              </MDBCol>
              <MDBCol md='2'>
                <a
                  href='https://twitter.com/login?lang=en'
                  rel='noopener noreferrer'
                  target='_blank'
                  className='btnFooterCRA'
                  style={{ textDecoration: 'none' }}>
                  <i
                    className='big twitter icon'
                    style={{ lineHeight: '2em' }}></i>
                </a>
              </MDBCol>
              <MDBCol md='2'>
                <a
                  href='https://www.youtube.com/channel/UCTte6DjiH7jKhmX0hIz0l_A'
                  rel='noopener noreferrer'
                  target='_blank'
                  className='btnFooterCRA'
                  style={{ textDecoration: 'none' }}>
                  <i
                    className='big youtube icon'
                    style={{ lineHeight: '2em' }}></i>
                </a>
              </MDBCol>
              <MDBCol md='2'>
                <a
                  href='https://github.com/alejo0o'
                  rel='noopener noreferrer'
                  target='_blank'
                  className='btnFooterCRA'
                  style={{ textDecoration: 'none' }}>
                  <i
                    className='big github icon'
                    style={{ lineHeight: '2em' }}></i>
                </a>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md='3'></MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className='footer-copyright text-center py-3' style={prueba}>
        <MDBContainer fluid style={prueba}>
          &copy; {new Date().getFullYear()} Copyright: <a href='/'>BSPAT</a>
        </MDBContainer>
      </div>
      <style>
        {`.btnFooterCRA {
          display: inline-block;
          width: 4em;
          height: 4em;
          background: #f1f1f1;
          margin: 2%;
          border-radius: 3em;
          box-shadow: 0 5px 15px -5px #00000070;
          overflow: hidden;
          position: relative;
          text-align: center;
        }

        .btnFooterCRA:hover i {
          transform: scale(1.12);
          color: #f1f1f1;
        }
        .btnFooterCRA::before {
          content: '';
          position: absolute;
          width: 120%;
          height: 120%;
          background: #3498db;
          transform: rotate(45deg);
          left: -110%;
          top: 90%;
        }
        .btnFooterCRA:hover::before {
          animation: aaa 0.7s 1;
          top: -10%;
          left: -10%;
        }

        @keyframes aaa {
          0% {
            left: -110%;
            top: 90%;
          }
          50% {
            left: 10%;
            top: -30%;
          }
          100% {
            top: -10%;
            left: -10%;
          }
        }`}
      </style>
    </MDBFooter>
  );
};

export default FooterPage;
