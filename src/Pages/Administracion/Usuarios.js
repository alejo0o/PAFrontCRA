import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faBan } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';
import Cookies from 'universal-cookie';
import { api_url } from '../../Components/utils/utils';
import {
  validateEmail
} from './ValidateFunctions';

const url = `${api_url}/api/Usuario/`;
const size = 5;

class respuestas extends React.Component {
  state = {
    data: [],
    error: false,
    pagina: '',
    size: '',
    totalPaginas: '',
    totalRegistros: '',
    modalEncerar: false,
    modalInsertar: false,
    modalEliminar: false,
    form: {
      userid: '',
      usernombre: '',
      userapellido: '',
      userfechanacimiento: Date,
      usernick: '',
      userpass: '',
      useremail: '',
      userfoto: '',
      useradmin: '',
      usersexo: '',
      userpuntaje: '',
      tipoModal: '',
    },
    formMensaje: {
      adminid: '',
      userid: '',
      mentitulo: '',
      mendetalle: '',
    },
  };
  peticionGet = (page, tamano) => {
    const urlGet = url + '?pageNumber=' + page + '&pageSize=' + tamano;
    axios
      .get(urlGet)
      .then((response) => {
        this.setState({ data: response.data.data });
        this.setState({ pagina: response.data.pageNumber });
        this.setState({ size: response.data.pageSize });
        this.setState({ totalPaginas: response.data.totalPages });
        this.setState({ totalRegistros: response.data.totalRecords });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  componentDidMount() {
    const cookies = new Cookies();
    if (typeof cookies.get('cookie1') !== 'undefined')
      if (cookies.get('cookie1').useradmin) {
        this.peticionGet(1, 20);
      } else this.props.history.push('/');
    else this.props.history.push('/');
  }

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  peticionPost = async () => {
    await axios
      .post(`${api_url}/api/mensaje/`, this.state.formMensaje)
      .then((response) => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  seleccionar = (usuario) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        userid: usuario.userid,
        usernombre: usuario.usernombre,
        userapellido: usuario.userapellido,
        userfechanacimiento: usuario.userfechanacimiento,
        usernick: usuario.usernick,
        userpass: usuario.userpass,
        useremail: usuario.useremail,
        userfoto: usuario.userfoto,
        useradmin: usuario.useradmin,
        usersexo: usuario.usersexo,
        userpuntaje: usuario.userpuntaje,
      },
    });
  };

  peticionPut = () => {
    if (this.state.form.useradmin == 'true') {
      this.state.form.useradmin = true;
    } else {
      this.state.form.useradmin = false;
    }
    axios
      .put(url + this.state.form.userid, this.state.form)
      .then((response) => {
        this.setState({ modalInsertar: false });
        this.peticionGet(this.state.pagina, this.state.size);
      });
  };

  peticionDelete = () => {
    axios.delete(url + this.state.form.userid).then((response) => {
      this.setState({ modalEliminar: false });
      this.peticionGet(this.state.pagina, this.state.size);
    });
  };

  peticionEncerar = () => {
    this.state.formMensaje.mendetalle = this.state.form.mensajeuser;
    delete this.state.form.mensajeuser;
    this.state.form.userpuntaje = 0;
    axios
      .put(url + this.state.form.userid, this.state.form)
      .then((response) => {
        this.setState({ modalEncerar: false });
        const cookies = new Cookies();
        this.state.formMensaje.mentitulo = 'Puntaje 0';
        this.state.formMensaje.adminid = cookies.get('cookie1').userid;
        this.state.formMensaje.userid = this.state.form.userid;
        this.peticionPost();
        this.peticionGet(this.state.pagina, this.state.size);
      });
  };

  render() {
    const { form } = this.state;
    let paginas = [];
    for (let i = 0; i < this.state.totalPaginas; i++) {
      if (parseInt(this.state.pagina) == i + 1) paginas[i] = [i + 1, true];
      else paginas[i] = [i + 1, false];
    }
    return (
      <>
        <Container>
          <br />
          <h2>Usuarios</h2>
          <br />
          <div class='table-responsive'>
            <Table className="ui striped table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Fecha de nacimiento</th>
                  <th>Nick</th>
                  <th>Password</th>
                  <th>Sexo</th>
                  <th>Email</th>
                  <th>Foto</th>
                  <th>Puntaje</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((usuario) => (
                  <tr key={usuario.userid}>
                    <td>{usuario.userid}</td>
                    <td>
                      {usuario.usernombre} {usuario.userapellido}
                    </td>
                    <td>
                      {moment(usuario.userfechanacimiento).format('DD/MM/YYYY')}
                    </td>
                    <td>{usuario.usernick}</td>
                    <td>{usuario.userpass}</td>
                    <td>{usuario.usersexo}</td>
                    <td  WIDTH="100">{usuario.useremail}</td>
                    <td>
                      <img src={usuario.userfoto} width='100' height='100' />
                    </td>
                    <td>{usuario.userpuntaje}</td>
                    <td>{usuario.useradmin ? 'Admin' : 'Usuario'}</td>
                    <td  WIDTH="100">
                      <Button
                        color='primary'
                        onClick={() => {
                          this.seleccionar(usuario);
                          this.modalInsertar();
                        }}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      {'  '}

                      <Button
                        color='warning'
                        onClick={() => {
                          this.seleccionar(usuario);
                          this.setState({ modalEncerar: true });
                        }}>
                        <FontAwesomeIcon icon={faBan} />
                      </Button>
                      <Button
                        color='danger'
                        onClick={() => {
                          this.seleccionar(usuario);
                          this.setState({ modalEliminar: true });
                        }}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Table>
              <thead>
                <tr>
                  <th>
                    <Button onClick={() => this.componentDidMount()}>
                      Primera
                    </Button>
                  </th>
                  {paginas.map((pag) => (
                    <th>
                      <Button
                        color={pag[1] ? 'info' : 'link'}
                        onClick={() =>
                          this.peticionGet(pag[0], this.state.size)
                        }>
                        {pag[0]}
                      </Button>
                    </th>
                  ))}
                  <th>
                    <Button
                      onClick={() =>
                        this.peticionGet(
                          this.state.totalPaginas,
                          this.state.size
                        )
                      }>
                      Ultima
                    </Button>
                  </th>
                </tr>
              </thead>
            </Table>

            <Modal isOpen={this.state.modalInsertar}>
              <ModalHeader style={{ display: 'block' }}>
                <span
                  style={{ float: 'right' }}
                  onClick={() => this.modalInsertar()}>
                  x
                </span>
              </ModalHeader>
              <ModalBody>
              
                <div className='form-group'>
                  <label htmlFor='id'>ID</label>
                  <input
                    className='form-control'
                    type='text'
                    name='userid'
                    id='userid'
                    readOnly
                    onChange={this.handleChange}
                    value={form ? form.userid : ''}
                  />
                  <br />
                  <label htmlFor='nombre'>Nombre</label>
                  <input
                    className='form-control'
                    type='text'
                    name='usernombre'
                    id='usernombre'
                    onChange={this.handleChange}
                    value={form ? form.usernombre : ''}
                  />
                  <br />
                  <label htmlFor='apellido'>Apellido</label>
                  <input
                    className='form-control'
                    type='text'
                    name='userapellido'
                    id='userapellido'
                    onChange={this.handleChange}
                    value={form ? form.userapellido : ''}
                  />
                  <br />
                  <label htmlFor='email'>Email</label>
                  <input
                    className='form-control'
                    type='hidden'
                    name='useremail'
                    id='useremail'
                    onChange={this.handleChange}
                    value={form ? form.useremail : ''}
                    error={validateEmail(form.useremail)}
                  />
                <Form.Input
                  fluid
                 
                  placeholder='Email'
                  onChange={this.handleChange}
                  type='email'
                  name='useremail'
                  value={form ? form.useremail : ''}
                  error={validateEmail(form.useremail)}
                />
                  <br />
                  <label htmlFor='fechanacimiento'>Fecha Nacimiento</label>
                  <input
                    className='form-control'
                    type='date'
                    name='userfechanacimiento'
                    id='userfechanacimiento'
                    onChange={this.handleChange}
                    value={
                      form
                        ? moment(form.userfechanacimiento).format('yyyy-MM-dd')
                        : ''
                    }
                  />
                  <br />
                  <label htmlFor='sexo'>Sexo</label>
                  <select
                    className='form-control'
                    name='usersexo'
                    id='usersexo'
                    onChange={this.handleChange}
                    value={form ? form.usersexo : ''}>
                    <option value='Masculino'>Masculino</option>
                    <option value='Femenino'>Femenino</option>
                    <option value='Otro'>Otro</option>
                  </select>
                  <label htmlFor='nick'>Usuario</label>
                  <input
                    className='form-control'
                    type='text'
                    name='usernick'
                    id='usernick'
                    readOnly
                    onChange={this.handleChange}
                    value={form ? form.usernick : ''}
                  />
                  <br />
                  <label htmlFor='foto'>Foto:</label> &nbsp;&nbsp;&nbsp;&nbsp;
                  <img
                    src={form ? form.userfoto : ''}
                    width='100'
                    height='100'
                  />{' '}
                  <br />
                  <input
                    className='form-control'
                    type='hidden'
                    name='userfoto'
                    id='userfoto'
                    readOnly
                    onChange={this.handleChange}
                    value={form ? form.userfoto : ''}
                  />
                  <br />
                  <label htmlFor='puntaje'>Puntaje</label>
                  <input
                    className='form-control'
                    type='text'
                    name='userpuntaje'
                    id='userpuntaje'
                    readOnly
                    onChange={this.handleChange}
                    value={form ? form.userpuntaje : ''}
                  />
                  <br />
                  <label htmlFor='admin'>Administrador</label>
                  <select
                    className='form-control'
                    name='useradmin'
                    id='useradmin'
                    onChange={this.handleChange}
                    value={form ? form.useradmin : ''}>
                    <option value='true'>Si</option>
                    <option value='false'>No</option>
                  </select>
                  <br />
                </div>

              </ModalBody>
              <ModalFooter>
              {this.state.tipoModal == "insertar" ? (
                <button
                  className="btn btn-success"
                  onClick={() => this.peticionPost()}
                >
                  Insertar
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => this.peticionPut()}
                >
                  Actualizar
                </button>
              )}
              <button
                className="btn btn-danger"
                onClick={() => this.modalInsertar()}
              >
                Cancelar
              </button>
            </ModalFooter>
              
            </Modal>

            <Modal isOpen={this.state.modalEliminar}>
              <ModalBody>
                Estás seguro que deseas eliminar el usuario{' '}
                {form && form.usuarioid}
              </ModalBody>
              <ModalFooter>
                <button
                  className='btn btn-danger'
                  onClick={() => this.peticionDelete()}>
                  Sí
                </button>
                <button
                  className='btn btn-secundary'
                  onClick={() => this.setState({ modalEliminar: false })}>
                  No
                </button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalEncerar}>
              <ModalBody>
                <div className='form-group'>
                  <label htmlFor='id'>ID</label>
                  <input
                    className='form-control'
                    type='text'
                    name='userid'
                    id='userid'
                    readOnly
                    onChange={this.handleChange}
                    value={form ? form.userid : ''}
                  />
                  <br />
                  Ingrese la razón para modificar la puntuación
                  <textarea
                    className='form-control'
                    type='text'
                    name='mensajeuser'
                    onChange={this.handleChange}
                    id='mensajeuser'
                    required>
                    {' '}
                  </textarea>
                  <br />
                  <br />
                  <input
                    className='form-control'
                    type='hidden'
                    name='usernombre'
                    id='usernombre'
                    onChange={this.handleChange}
                    value={form ? form.usernombre : ''}
                  />
                  <input
                    className='form-control'
                    type='hidden'
                    name='userapellido'
                    id='userapellido'
                    onChange={this.handleChange}
                    value={form ? form.userapellido : ''}
                  />
                  <input
                    className='form-control'
                    type='hidden'
                    name='useremail'
                    id='useremail'
                    onChange={this.handleChange}
                    value={form ? form.useremail : ''}
                  />
                  <input
                    className='form-control'
                    type='hidden'
                    name='userfechanacimiento'
                    id='userfechanacimiento'
                    onChange={this.handleChange}
                    value={
                      form
                        ? moment(form.userfechanacimiento).format('yyyy-MM-dd')
                        : ''
                    }
                  />
                  <input
                    className='form-control'
                    type='hidden'
                    name='usersexo'
                    id='usersexo'
                    onChange={this.handleChange}
                    value={form ? form.usersexo : ''}
                  />
                  <input
                    className='form-control'
                    type='hidden'
                    name='usernick'
                    id='usernick'
                    readOnly
                    onChange={this.handleChange}
                    value={form ? form.usernick : ''}
                  />
                  <input
                    className='form-control'
                    type='hidden'
                    name='userfoto'
                    id='userfoto'
                    onChange={this.handleChange}
                    value={form ? form.userfoto : ''}
                  />
                  <input
                    className='form-control'
                    type='hidden'
                    name='userpuntaje'
                    id='userpuntaje'
                    readOnly
                    onChange={this.handleChange}
                  />
                  <input
                    className='form-control'
                    type='hidden'
                    name='useradmin'
                    id='useradmin'
                    onChange={this.handleChange}
                    value={form ? form.useradmin : ''}
                  />
                  <br />
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  className='btn btn-danger'
                  onClick={() => this.peticionEncerar()}>
                  Enviar
                </button>
                <button
                  className='btn btn-secundary'
                  onClick={() => this.setState({ modalEncerar: false })}>
                  Regresar
                </button>
              </ModalFooter>
            </Modal>
          </div>
        </Container>
      </>
    );
  }
}

export default respuestas;
