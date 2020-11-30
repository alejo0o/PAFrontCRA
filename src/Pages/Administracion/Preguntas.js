import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from 'reactstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { api_url } from '../../Components/utils/utils';

const url = `${api_url}/api/pregunta/`;

class preguntas extends React.Component {
  state = {
    data: [],
    categorias: [],
    pagina: '',
    size: '',
    totalPaginas: '',
    totalRegistros: '',
    modalInsertar: false,
    modalEliminar: false,
    form: {
      pregid: '',
      userid: '',
      catid: '',
      pregtexto: '',
      pregdetalle: '',
      catnombre: '',
      pregfecha: '',
      preghora: '',
      tipoModal: '',
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
    if (typeof cookies.get('cookie1') !== 'undefined') {
      if (cookies.get('cookie1').useradmin) {
        this.peticionGet(1, 20);
        axios
          .get(`${api_url}/api/categoria/`)
          .then((response) => {
            this.setState({ categorias: response.data.data });
          })
          .catch((error) => {
            console.log(error);
          });
      } else this.props.history.push('/');
    } else this.props.history.push('/');
  }

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  peticionPost = async () => {
    delete this.state.form.catid;
    await axios
      .post(url, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet(this.state.pagina, this.state.size);
      })
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

  seleccionar = (pregunta) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        pregid: pregunta.pregid,
        userid: pregunta.userid,
        catid: pregunta.catid,
        pregtexto: pregunta.pregtexto,
        pregdetalle: pregunta.pregdetalle,
        catnombre: pregunta.catnombre,
        pregfecha: pregunta.pregfecha,
        preghora: pregunta.preghora,
      },
    });
  };

  peticionPut = () => {
    this.state.categorias.map((elemento, i) => {
      if (elemento.catid == this.state.form.catnombre) {
        this.state.form.catid = parseInt(this.state.form.catnombre);
        this.state.form.catnombre = elemento.catnombre;
      }
    });
    axios
      .put(url + this.state.form.pregid, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet(this.state.pagina, this.state.size);
      });
  };

  peticionDelete = () => {
    axios.delete(url + this.state.form.pregid).then((response) => {
      this.setState({ modalEliminar: false });
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
    for (let i = 0; i < this.state.categorias.length; i++) {
      if (this.state.form.catid == this.state.categorias[i].catid) {
        this.state.categorias[i].select = true;
        break;
      } else this.state.categorias[i].select = false;
    }
    return (
      <>
        <Container>
          <br />
          <h2>Preguntas</h2>
          <br />

          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Usuario Id</th>
                <th>Categoria Id</th>
                <th>Categoria</th>
                <th>Texto</th>
                <th>Detalle</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((pregunta) => (
                <tr key={pregunta.pregid}>
                  <td>{pregunta.pregid}</td>
                  <td>{pregunta.userid}</td>
                  <td>{pregunta.catid}</td>
                  <td>{pregunta.catnombre}</td>
                  <td>{pregunta.pregtexto}</td>
                  <td>{pregunta.pregdetalle}</td>
                  <td>{pregunta.pregfecha}</td>
                  <td>
                    {pregunta.preghora.hours}:{pregunta.preghora.minutes}:
                    {pregunta.preghora.seconds}
                  </td>
                  <td>
                    <Button
                      color='primary'
                      onClick={() => {
                        this.seleccionar(pregunta);
                        this.modalInsertar();
                      }}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    {'  '}
                    <Button
                      color='danger'
                      onClick={() => {
                        this.seleccionar(pregunta);
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
                      onClick={() => this.peticionGet(pag[0], this.state.size)}>
                      {pag[0]}
                    </Button>
                  </th>
                ))}
                <th>
                  <Button
                    onClick={() =>
                      this.peticionGet(this.state.totalPaginas, this.state.size)
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
                  name='pregid'
                  id='pregid'
                  readOnly
                  onChange={this.handleChange}
                  value={form ? form.pregid : ''}
                />
                <br />
                <input
                  className='form-control'
                  type='hidden'
                  name='userid'
                  id='userid'
                  readOnly
                  onChange={this.handleChange}
                  value={form ? form.userid : ''}
                />
                <input
                  className='form-control'
                  type='hidden'
                  name='respid'
                  id='respid'
                  readOnly
                  onChange={this.handleChange}
                  value={form ? form.respid : ''}
                />
                <label htmlFor='nombre'>Categoría</label>
                <select
                  className='form-control'
                  name='catnombre'
                  id='catnombre'
                  onChange={this.handleChange}
                  value={form ? form.catid : ''}>
                  {this.state.categorias.map((elemento) => (
                    <option
                      key={elemento.catnombre}
                      value={elemento.catid}
                      name={elemento.catnombre}>
                      {elemento.catnombre}
                    </option>
                  ))}
                </select>

                <label htmlFor='nombre'>Texto</label>
                <input
                  className='form-control'
                  type='text'
                  name='pregtexto'
                  id='pregtexto'
                  onChange={this.handleChange}
                  value={form ? form.pregtexto : ''}
                />
                <label htmlFor='detalle'>Detalle</label>
                <input
                  className='form-control'
                  type='text'
                  name='pregdetalle'
                  id='pregdetalle'
                  onChange={this.handleChange}
                  value={form ? form.pregdetalle : ''}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              {this.state.tipoModal == 'insertar' ? (
                <button
                  className='btn btn-success'
                  onClick={() => this.peticionPost()}>
                  Insertar
                </button>
              ) : (
                <button
                  className='btn btn-primary'
                  onClick={() => this.peticionPut()}>
                  Actualizar
                </button>
              )}
              <button
                className='btn btn-danger'
                onClick={() => this.modalInsertar()}>
                Cancelar
              </button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
              Estás seguro que deseas eliminar la pregunta {form && form.pregid}
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
        </Container>
      </>
    );
  }
}

export default preguntas;
