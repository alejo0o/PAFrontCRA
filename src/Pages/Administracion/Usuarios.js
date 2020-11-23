import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
import axios from 'axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const url = "https://localhost:5001/api/usuario/"

class respuestas extends React.Component{

    state={
        data:[],
        total:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            userid: '',
            usernombre:'',
            userapellido:'',
            userfechanacimiento:'',
            usernick:'',
            userpass:'',
            useremail:'',
            userfoto:'',
            useradmin:'',
            usersexo:'',
            userpuntaje:'',
            tipoModal:''
        }
    }
    peticionGet=()=>{
        axios.get(url).then(response=>{
            this.setState({data: response.data.data});
            this.setState({total: response.data});
        }).catch(error=>{
            console.log(error.message);
        })
    }

    componentDidMount(){
        this.peticionGet();
    }

    modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
    }

    peticionPost=async()=>{
        delete this.state.form.userid;
        await axios.post(url,this.state.form).then(response=>{
          this.modalInsertar();
          this.peticionGet();
        }).catch(error=>{
          console.log(error.message);
        })
      }

    handleChange=async e =>{
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    seleccionar=(usuario)=>{
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
            userpuntaje: usuario.userpuntaje
          }
        })
      }

    peticionPut=()=>{
    axios.put(url+this.state.form.userid, this.state.form).then(response=>{
        this.modalInsertar();
        this.peticionGet();
    })
    }

    peticionDelete=()=>{
        axios.delete(url+this.state.form.userid).then(response=>{
          this.setState({modalEliminar: false});
          this.peticionGet();
        })
      }

    render(){
        const {form}=this.state;
        return(
            <>
            <Container>
                <br/>
                <h2>Usuarios</h2>
                <br/>
                <div class="table-responsive">
                <Table >
                    <thead><tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Fecha de nacimiento</th>
                        <th>Nick</th>
                        <th>Password</th>
                        <th>Sexo</th>
                        <th>Email</th>
                        <th>Foto</th>
                        <th>Puntaje</th>
                        <th>Admin</th>
                        <th>Acciones</th>
                    </tr></thead>
                    <tbody>
                        {this.state.data.map(usuario=>(
                            <tr key={usuario.userid}>
                                <td>{usuario.userid}</td>
                                <td>{usuario.usernombre} {usuario.userapellido}</td>
                                <td>{usuario.userfechanacimiento}</td>
                                <td>{usuario.usernick}</td>
                                <td>{usuario.userpass}</td>
                                <td>{usuario.usersexo}</td>
                                <td>{usuario.useremail}</td>
                                <td><img src={usuario.userfoto} width="100" height="100"/></td>
                                <td>{usuario.userpuntaje}</td>
                                <td>{usuario.useradmin}</td>
                                <td>
                                <Button color="primary" onClick={()=>{this.seleccionar(usuario); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></Button>
                                {"  "}
                                <Button color="danger" onClick={()=>{this.seleccionar(usuario); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                    
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{display: 'block'}}>
                    <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                    <div className="form-group">
                        <label htmlFor="id">ID</label>
                        <input className="form-control" type="text" name="respid" id="respid" readOnly onChange={this.handleChange} value={form?form.respid:''}/>
                        <br/>
                        <input className="form-control" type="hidden" name="userid" id="userid" readOnly onChange={this.handleChange} value={form?form.userid:''}/>
                        <input className="form-control" type="hidden" name="pregid" id="pregid" readOnly onChange={this.handleChange} value={form?form.pregid:''}/>
                        <input className="form-control" type="hidden" name="respfecha" id="respfecha" readOnly onChange={this.handleChange} value={form?form.respfecha:''}/>
                        <input className="form-control" type="hidden" name="resphora" id="resphora" readOnly onChange={this.handleChange} value={form?form.resphora:''}/>
                        <label htmlFor="nombre">Texto</label>
                        <input className="form-control" type="text" name="resptexto" id="resptexto" onChange={this.handleChange} value={form?form.resptexto: ''}/>
                    </div>
                    </ModalBody>

                    <ModalFooter>
                        {this.state.tipoModal == 'insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                        Insertar
                    </button>:
                    <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                        Actualizar
                    </button>
                    }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>
                

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estás seguro que deseas eliminar la respuesta {form && form.respid}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                    </ModalFooter>
                </Modal>

                </div>
            </Container>
            </>
        )
    }
}

export default respuestas;