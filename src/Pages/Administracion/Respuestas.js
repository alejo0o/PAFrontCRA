import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import moment from "moment";
import Cookies from "universal-cookie";
import { api_url } from "../../Components/utils/utils";


const url = `${api_url}/api/respuesta/`;

class respuestas extends React.Component {
  state = {
    data: [],
    pagina: "",
    size: "",
    totalPaginas: "",
    totalRegistros: "",
    modalInsertar: false,
    modalEliminar: false,
    form: {
      respid: "",
      userid: "",
      pregid: "",
      resptexto: "",
      respfecha: "",
      resphora: Date,
      tipoModal: "",
    },
  };
  peticionGet = (page, tamano) => {
    const urlGet = url + "?pageNumber=" + page + "&pageSize=" + tamano;
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
    if (typeof cookies.get("cookie1") !== "undefined")
      if (cookies.get("cookie1").useradmin) {
        this.peticionGet(1, 20);
      } else this.props.history.push("/");
    else this.props.history.push("/");
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

  seleccionar = (respuesta) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        respid: respuesta.respid,
        userid: respuesta.userid,
        pregid: respuesta.pregid,
        resptexto: respuesta.resptexto,
        respfecha: moment(respuesta.respfecha).format("YYYY-MM-DD"),
        //resphora: respuesta.resphora.hours+":"+respuesta.resphora.minutes+":"+respuesta.resphora.seconds
        resphora: respuesta.resphora,
      },
    });
  };

  peticionPut = () => {
    axios
      .put(url + this.state.form.respid, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet(this.state.pagina, this.state.size);
      });
  };

  peticionDelete = () => {
    axios.delete(url + this.state.form.respid).then((response) => {
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
    return (
      <>
        <Container>
          <br />
          <h2>Respuestas</h2>
          <br />

          <Table className="ui striped table">
            <thead>
              <tr>
                <th>Id</th>
                <th hidden>Usuario Id</th>
                <th hidden>Pregunta Id</th>
                <th>Respuesta</th>
                <th>Fecha</th>
                <th hidden>Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((respuesta) => (
                <tr key={respuesta.respid}>
                  <td>{respuesta.respid}</td>
                  <td hidden>{respuesta.userid}</td>
                  <td hidden>{respuesta.pregid}</td>
                  <td  WIDTH="800">{respuesta.resptexto}</td>
                  <td>{moment(respuesta.respfecha).format("YYYY-MM-DD")}</td>
                  <td hidden>
                    {respuesta.resphora.hours}:{respuesta.resphora.minutes}:
                    {respuesta.resphora.seconds}
                  </td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => {
                        this.seleccionar(respuesta);
                        this.modalInsertar();
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    {"  "}
                    <Button
                      color="danger"
                      onClick={() => {
                        this.seleccionar(respuesta);
                        this.setState({ modalEliminar: true });
                      }}
                    >
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
                      color={pag[1] ? "info" : "link"}
                      onClick={() => this.peticionGet(pag[0], this.state.size)}
                    >
                      {pag[0]}
                    </Button>
                  </th>
                ))}
                <th>
                  <Button
                    onClick={() =>
                      this.peticionGet(this.state.totalPaginas, this.state.size)
                    }
                  >
                    Ultima
                  </Button>
                </th>
              </tr>
            </thead>
          </Table>

          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{ display: "block" }}>
              <span
                style={{ float: "right" }}
                onClick={() => this.modalInsertar()}
              >
                x
              </span>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input
                  className="form-control"
                  type="text"
                  name="respid"
                  id="respid"
                  readOnly
                  onChange={this.handleChange}
                  value={form ? form.respid : ""}
                />
                <br />
                <input
                  className="form-control"
                  type="hidden"
                  name="userid"
                  id="userid"
                  readOnly
                  onChange={this.handleChange}
                  value={form ? form.userid : ""}
                />
                <input
                  className="form-control"
                  type="hidden"
                  name="pregid"
                  id="pregid"
                  readOnly
                  onChange={this.handleChange}
                  value={form ? form.pregid : ""}
                />
                <input
                  className="form-control"
                  type="hidden"
                  name="respfecha"
                  id="respfecha"
                  readOnly
                  onChange={this.handleChange}
                  value={form ? form.respfecha : ""}
                />
                <input
                  className="form-control"
                  type="hidden"
                  name="resphora"
                  id="resphora"
                  readOnly
                  onChange={this.handleChange}
                  value={form ? form.resphora : ""}
                />
                <label htmlFor="nombre">Texto</label>
                <input
                  className="form-control"
                  type="text"
                  name="resptexto"
                  id="resptexto"
                  onChange={this.handleChange}
                  value={form ? form.resptexto : ""}
                />
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
              Estás seguro que deseas eliminar la respuesta{" "}
              {form && form.respid}
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-danger"
                onClick={() => this.peticionDelete()}
              >
                Sí
              </button>
              <button
                className="btn btn-secundary"
                onClick={() => this.setState({ modalEliminar: false })}
              >
                No
              </button>
            </ModalFooter>
          </Modal>
        </Container>
      </>
    );
  }
}

export default respuestas;
