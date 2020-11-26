import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {Table, Button, Container, Modal, ModalBody, ModalHeader,  ModalFooter} from 'reactstrap';
import axios from 'axios';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const url = "https://localhost:5001/api/Categoria/"

class categorias extends React.Component{

    state={
        data:[],
        pagina:'',
        size:'',
        totalPaginas:'',
        totalRegistros:'',
        modalInsertar: false,
        modalEliminar: false,
        form:{
            catid: '',
            catnombre:'',
            catdescripcion:'',
            tipoModal:''
        }
    }
    peticionGet=(page, tamano)=>{
        const urlGet = "https://localhost:5001/api/categoria/?pageNumber="+page+"&pageSize="+tamano;
        axios.get(urlGet).then(response=>{
            this.setState({total: response.data});
            this.setState({data: response.data.data});
        }).catch(error=>{
            console.log(error.message);
        })
    }

    componentDidMount(){
        this.peticionGet(1,20);
    }

    modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
    }

    peticionPost=async()=>{
        delete this.state.form.catid;
        await axios.post(url,this.state.form).then(response=>{
          this.modalInsertar();
          this.peticionGet(this.state.pagina,this.state.size);
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
        this.peticionGet(this.state.pagina,this.state.size);
    })
    }

    peticionDelete=()=>{
        axios.delete(url+this.state.form.catid).then(response=>{
          this.setState({modalEliminar: false});
          this.peticionGet(this.state.pagina,this.state.size);
        })
      }

    render(){
        const {form}=this.state;
        let paginas = [];
        for(let i=0;i<this.state.totalPaginas;i++)
        {
            if(parseInt(this.state.pagina)==i+1)
                paginas[i]= [i+1, true];
            else
                paginas[i]= [i+1, false];
        }
        return(
            <>
            <Container>
                <div>
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
                                <Button color="primary" onClick={()=>{this.seleccionar(categoria); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></Button>
                                {"  "}
                                <Button color="danger" onClick={()=>{this.seleccionar(categoria); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Table>
                    <thead>
                        <tr>
                            <th><Button onClick={()=>this.componentDidMount()}>Primera</Button></th> 
                            {paginas.map(pag=>(
                                    <th><Button color={pag[1]?"info":"link"} onClick={()=>this.peticionGet(pag[0],this.state.size)}>{pag[0]}</Button></th>
                            ))}
                            <th><Button onClick={()=>this.peticionGet(this.state.totalPaginas,this.state.size)}>Ultima</Button></th> 
                        </tr>
                    </thead>
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

                </div>
            </Container>
            </>
        )
    }
}

export default categorias;