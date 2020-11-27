import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader/Loader';
import Categorias from '../Components/Categorias/Categorias';
import Clasificacion from '../Components/Clasificacion/Clasificacion';
import FormPregunta from '../Components/Pregunta/Pregunta';
import { api_url } from '../Components/utils/utils';
import Cookies from 'universal-cookie';
import Logearse from '../Components/Pregunta/Logearse';
import Error from '../Components/Error/Error';
const cookies = new Cookies();

class Pregunta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      warning: false,
      error: null,
      loading: true,
      usuario: cookies.get('cookie1'),
      categorias: {
        catid: '',
        catnombre: '',
        catdescripcion: '',
      },
      pregunta: {
        userid: '',
        catid: 1,
        pregtexto: '',
        pregdetalle: '',
        catnombre: 'Sexualidad',
      },
    };
  }
  componentDidMount() {
    this.fetchData();
    if (this.state.usuario)
      this.setState({
        pregunta: {
          userid: this.state.usuario.userid,
          catid: 1,
          pregtexto: '',
          pregdetalle: '',
          catnombre: 'Sexualidad',
        },
      });
  }

  handleChange = (e) => {
    //maneja el cambio en el componente hijo y setea los valores a las variables de estado
    this.setState({
      pregunta: {
        ...this.state.pregunta,
        userid: this.state.usuario.userid,
        catnombre: this.state.pregunta.catnombre,
        catid: this.state.pregunta.catid,
        [e.target.name]: e.target.value,
      },
    });
  };
  dropDownChange = (e, { value }) => {
    this.setState({
      pregunta: {
        userid: this.state.usuario.userid,
        catid: value,
        pregtexto: this.state.pregunta.pregtexto,
        pregdetalle: this.state.pregunta.pregdetalle,
        catnombre: e.target.textContent,
      },
    });
  };

  onClickButton = async (e) => {
    //maneja el click del button para hacer el post del formulario pregunta
    this.setState({
      loading: true,
      error: null,
    });
    try {
      //e.preventDefault();
      if (this.state.usuario.userpuntaje >= 10) {
        const response = await axios.post(
          `${api_url}/api/pregunta`,
          this.state.pregunta
        );
        if (response.status === 201) {
          const editresponse = await axios.put(
            `${api_url}/api/usuario/${this.state.usuario.userid}`,
            {
              useradmin: this.state.usuario.useradmin,
              userapellido: this.state.usuario.userapellido,
              useremail: this.state.usuario.useremail,
              userfechanacimiento: this.state.usuario.userfechanacimiento,
              userfoto: this.state.usuario.userfoto,
              userid: this.state.usuario.userid,
              usernick: this.state.usuario.usernick,
              usernombre: this.state.usuario.usernombre,
              userpass: this.state.usuario.userpass,
              userpuntaje: this.state.usuario.userpuntaje - 10,
              usersexo: this.state.usuario.usersexo,
            }
          );
          const { data: usuarioNuevo } = await axios.get(
            `${api_url}/api/usuario/${this.state.usuario.userid}`
          );
          //seteo del nuevo usuario en la cookie
          cookies.set('cookie1', usuarioNuevo, { path: '/' });

          this.setState({
            usuario: usuarioNuevo,
            success: true,
            loading: false,
            error: null,
            warning: false,
          });
        }
      } else {
        this.setState({
          loading: false,
          error: null,
          warning: true,
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
      console.log(error);
    }
  };

  fetchData = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const { data } = await axios.get(`${api_url}/api/categoria`);
      this.setState({
        categorias: data.data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  modalOnClose = () => {
    this.setState({
      warning: false,
    });
  };

  modalOnCloseSuccess = () => {
    this.setState({
      success: false,
    });
    window.location.reload();
  };

  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;

    return (
      <div style={{ display: 'flex' }}>
        <Categorias />
        {this.state.usuario && (
          <FormPregunta
            evento={this.handleChange}
            formValues={this.state.pregunta}
            buttonClick={this.onClickButton}
            categorias={this.state.categorias}
            dropDownChange={this.dropDownChange}
            warning={this.state.warning}
            modalOnClose={this.modalOnClose}
            usuarioPuntaje={this.state.usuario.userpuntaje}
            success={this.state.success}
            modalSuccessClose={this.modalOnCloseSuccess}
          />
        )}
        {!this.state.usuario && <Logearse />}
        <Clasificacion />
      </div>
    );
  }
}

export default Pregunta;
