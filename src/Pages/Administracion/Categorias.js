import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
import axios from 'axios';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const url = "https://localhost:5001/api/Categoria/"

class categorias extends React.Component{

    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            catid: '',
            catnombre:'',
            catdescripcion:'',
            tipoModal:''
        }
    }
    peticionGet=()=>{
        axios.get(url).then(response=>{
            this.setState({data: response.data});
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

    seleccionar=(categoria)=>{
        this.setState({
          tipoModal: 'actualizar',
          form: {
            catid: categoria.catid,
            catnombre: categoria.catnombre,
            catdescripcion: categoria.catdescripcion
          }
        })
      }

    peticionPut=()=>{
    axios.put(url+this.state.form.catid, this.state.form).then(response=>{
        this.modalInsertar();
        this.peticionGet();
    })
    }

    peticionDelete=()=>{
        axios.delete(url+this.state.form.catid).then(response=>{
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
                <h2>Categorias</h2>
                <button className="ui teal button m1-2" onClick={()=>{this.setState({form: null, tipoModal:'insertar'});this.modalInsertar()}}>Agregar Categoria</button>
                <br/><br/>
                <Table>
                    <thead><tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr></thead>
                    <tbody>
                        {this.state.data.map(categoria=>(
                            <tr key={categoria.catid}>
                                <td>{categoria.catid}</td>
                                <td>{categoria.catnombre}</td>
                                <td>{categoria.catdescripcion}</td>
                                <td>
                                <Button color="primary" onClick={()=>{this.seleccionar(categoria); this.modalInsertar()}}></Button>
                                {"  "}
                                <Button color="danger" onClick={()=>{this.seleccionar(categoria); this.setState({modalEliminar: true})}}></Button></td>
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
                        <input className="form-control" type="text" name="catid" id="catid" readOnly onChange={this.handleChange} value={form?form.catid:''}/>
                        <br />
                        <label htmlFor="nombre">Nombre</label>
                        <input className="form-control" type="text" name="catnombre" id="catnombre" onChange={this.handleChange} value={form?form.catnombre: ''}/>
                        <br />
                        <label htmlFor="nombre">Descripción</label>
                        <input className="form-control" type="text" name="catdescripcion" id="catdescripcion" onChange={this.handleChange} value={form?form.catdescripcion: ''}/>
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
                        Estás seguro que deseas eliminar a la categoria {form && form.catnombre}
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

export default categorias;