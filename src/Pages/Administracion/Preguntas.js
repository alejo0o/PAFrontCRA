import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
import axios from 'axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const url = "https://localhost:5001/api/pregunta/"

class preguntas extends React.Component{

    state={
        data:[],
        total:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            pregid: '',
            userid:'',
            catid:'',
            pregtexto:'',
            pregdetalle:'',
            catnombre:'',
            pregfecha:'',
            preghora:'',
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
        delete this.state.form.catid;
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

    seleccionar=(pregunta)=>{
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
          }
        })
      }

    peticionPut=()=>{
    axios.put(url+this.state.form.pregid, this.state.form).then(response=>{
        this.modalInsertar();
        this.peticionGet();
    })
    }

    peticionDelete=()=>{
        axios.delete(url+this.state.form.pregid).then(response=>{
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
                <h2>Preguntas</h2>
                <br/>
                
                <Table>
                    <thead><tr>
                        <th>Id</th>
                        <th>Usuario Id</th>
                        <th>Categoria Id</th>
                        <th>Categoria</th>
                        <th>Texto</th>
                        <th>Detalle</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Acciones</th>
                    </tr></thead>
                    <tbody>
                        {this.state.data.map(pregunta=>(
                            <tr key={pregunta.pregid}>
                                <td>{pregunta.pregid}</td>
                                <td>{pregunta.userid}</td>
                                <td>{pregunta.catid}</td>
                                <td>{pregunta.catnombre}</td>
                                <td>{pregunta.pregtexto}</td>
                                <td>{pregunta.pregdetalle}</td>
                                <td>{pregunta.pregfecha}</td>
                                <td>{pregunta.preghora.hours}:{pregunta.preghora.minutes}:{pregunta.preghora.seconds}</td>
                                <td>
                                <Button color="primary" onClick={()=>{this.seleccionar(pregunta); this.modalInsertar()}}></Button>
                                {"  "}
                                <Button color="danger" onClick={()=>{this.seleccionar(pregunta); this.setState({modalEliminar: true})}}></Button></td>
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

            
            </Container>
            </>
        )
    }
}

export default preguntas;