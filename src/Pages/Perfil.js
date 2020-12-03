import React, { Component } from 'react';
import Loader from '../Components/Loader/Loader';
import { api_url, serverImageURL } from '../Components/utils/utils';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Tab } from 'semantic-ui-react';
import Tab1 from '../Components/Perfil/UsuarioPerfil';
import Tab2 from '../Components/Perfil/PreguntasUsuario';
import Tab3 from '../Components/Perfil/RespuestasUsuario';
import Tab4 from '../Components/Perfil/PreguntasCerradasUsuario';
import Tab5 from '../Components/Perfil/Mensajesusuario';
import Error from '../Components/Error/Error';

const cookies = new Cookies();

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,

      cambiadoErroneo: false,
      // cookie: new Cookies(),
      user: cookies.get('cookie1'),
      fotoUsuario: '',
      fileNameFotoUsuario: '',
      emailInvalido: false,
      usuarioUpdate: {
        userid: '',
        usernombre: '',
        userapellido: '',
        userfechanacimiento: '',
        usernick: '',
        userpass: '',
        useremail: '',
        userfoto: '',
        usersexo: '',
        userpuntaje: '',
        useradmin: '',
      },
      usuarioPasswordUpdate: {
        userid: '',
        usernombre: '',
        userapellido: '',
        userfechanacimiento: '',
        usernick: '',
        userpass: '',
        useremail: '',
        userfoto: '',
        usersexo: '',
        userpuntaje: '',
        useradmin: '',
      },
      preguntas: {},
      preguntasCerradas: {},
      respuestas: {},
      passwordAnterior: '',
      respuestaModificada: {
        userid: '',
        pregid: '',
        resptexto: '',
      },
      //paginador
      page: 1,
      totalPreguntas: 0,
      totalPreguntasCerradas: 0,
      totalRespuestas: 0,
      totalMensajes: 0,

      tab: 0,
    };
  }
  componentDidMount() {
    this.fetchData();
    if (this.state.user) {
      this.setState({
        usuarioUpdate: {
          userid: this.state.user.userid,
          usernombre: this.state.user.usernombre,
          userapellido: this.state.user.userapellido,
          userfechanacimiento: this.state.user.userfechanacimiento,
          usernick: this.state.user.usernick,
          userpass: this.state.user.userpass,
          useremail: this.state.user.useremail,
          userfoto: this.state.user.userfoto,
          usersexo: this.state.user.usersexo,
          userpuntaje: this.state.user.userpuntaje,
          useradmin: this.state.user.useradmin,
        },
        usuarioPasswordUpdate: {
          userid: this.state.user.userid,
          usernombre: this.state.user.usernombre,
          userapellido: this.state.user.userapellido,
          userfechanacimiento: this.state.user.userfechanacimiento,
          usernick: this.state.user.usernick,
          userpass: this.state.user.userpass,
          useremail: this.state.user.useremail,
          userfoto: this.state.user.userfoto,
          usersexo: this.state.user.usersexo,
          userpuntaje: this.state.user.userpuntaje,
          useradmin: this.state.user.useradmin,
        },
        respuestaModificada: {
          userid: this.state.user.userid,
          pregid: '',
          resptexto: '',
        },
      });
    }
  }
  fetchData = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const { data: responsePregunta } = await axios.get(
        `${api_url}/api/customqueries/pregXuser/${this.state.user.userid}?pageNumber=${this.state.page}`
      );

      const { data: responseRespuesta } = await axios.get(
        `${api_url}/api/customqueries/pregYrespXuser/${this.state.user.userid}?pageNumber=${this.state.page}`
      );

      const { data: responsePreguntaCerradas } = await axios.get(
        `${api_url}/api/customqueries/predCad/${this.state.user.userid}?pageNumber=${this.state.page}`
      );

      const { data: mensajeUser } = await axios.get(
        `${api_url}/api/customqueries/menUser/${this.state.user.userid}?pageNumber=${this.state.page}`
      );

      this.setState({
        preguntas: responsePregunta,
        respuestas: responseRespuesta,
        preguntasCerradas: responsePreguntaCerradas,
        menUser: mensajeUser,
        loading: false,
        error: null,
        totalPreguntas: responsePregunta.totalPages,
        totalRespuestas: responseRespuesta.totalPages,
        totalPreguntasCerradas: responsePreguntaCerradas.totalPages,
        totalMensajes: mensajeUser.totalPages,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  handleChangeUpdate = (e) => {
    //maneja el cambio en el componente hijo y setea los valores a las variables de estado
    this.setState({
      usuarioUpdate: {
        ...this.state.usuarioUpdate,
        userid: this.state.usuarioUpdate.userid,
        usernombre: this.state.usuarioUpdate.usernombre,
        userapellido: this.state.usuarioUpdate.userapellido,
        userfechanacimiento: this.state.usuarioUpdate.userfechanacimiento,
        usernick: this.state.usuarioUpdate.usernick,
        userpass: this.state.usuarioUpdate.userpass,
        usersexo: this.state.usuarioUpdate.usersexo,
        useremail: this.state.usuarioUpdate.useremail,
        userfoto: this.state.usuarioUpdate.userfoto,
        useradmin: this.state.usuarioUpdate.useradmin,
        [e.target.name]: e.target.value,
      },
    });
  };

  //obtiene la extension del archivo que se ingresa en el input
  getFileExtension1(filename) {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
  }

  handleOnChangeFoto = (e) => {
    this.setState({
      usuarioUpdate: {
        ...this.state.usuarioUpdate,
        userid: this.state.usuarioUpdate.userid,
        usernombre: this.state.usuarioUpdate.usernombre,
        userapellido: this.state.usuarioUpdate.userapellido,
        userfechanacimiento: this.state.usuarioUpdate.userfechanacimiento,
        usernick: this.state.usuarioUpdate.usernick,
        userpass: this.state.usuarioUpdate.userpass,
        usersexo: this.state.usuarioUpdate.usersexo,
        useremail: this.state.usuarioUpdate.useremail,
        useradmin: this.state.usuarioUpdate.useradmin,
        userfoto: `${serverImageURL}/getImagen?imagen=${
          this.state.usuarioUpdate.usernick
        }.${this.getFileExtension1(e.target.files[0].name)}`,
      },
      fotoUsuario: e.target.files[0],
      fileNameFotoUsuario: `${
        this.state.usuarioUpdate.usernick
      }.${this.getFileExtension1(e.target.files[0].name)}`.toString(),
    });
  };

  onClickButtonUpdate = async (e) => {
    e.preventDefault();

    //maneja el click del button para hacer el post del formulario pregunta
    this.setState({
      loading: true,
      error: null,
    });
    try {
      //update del usuarioen el servidor de fotos
      if (
        this.state.fileNameFotoUsuario &&
        this.state.fotoUsuario &&
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          this.state.usuarioUpdate.useremail
        )
      ) {
        const formData = new FormData();
        formData.append('file', this.state.fotoUsuario);

        const res = await axios.post(
          `${serverImageURL}/upload?usuario=${this.state.fileNameFotoUsuario}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
      if (
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          this.state.usuarioUpdate.useremail
        )
      ) {
        const response = await axios.put(
          `${api_url}/api/usuario/${this.state.usuarioUpdate.userid}`,
          this.state.usuarioUpdate
        );
        //saca el nuevo usuario modificado para poder seteralo en la cookie
        const { data: usuarioNuevo } = await axios.get(
          `${api_url}/api/usuario/${this.state.user.userid}`
        );
        cookies.set('cookie1', usuarioNuevo, { path: '/' });
        //////////////////////////////////
        window.location.reload();
        this.setState({
          loading: false,
          error: null,
        });
      } else {
        this.setState({ loading: false, error: null, emailInvalido: true });
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  handleChangeUpdatePassword = (e) => {
    //maneja el cambio en el componente hijo y setea los valores a las variables de estado
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangeNewPassword = (e) => {
    this.setState({
      usuarioPasswordUpdate: {
        ...this.state.usuarioPasswordUpdate,
        userid: this.state.usuarioPasswordUpdate.userid,
        usernombre: this.state.usuarioPasswordUpdate.usernombre,
        userapellido: this.state.usuarioPasswordUpdate.userapellido,
        userfechanacimiento: this.state.usuarioPasswordUpdate
          .userfechanacimiento,
        usernick: this.state.usuarioPasswordUpdate.usernick,
        userpass: this.state.usuarioPasswordUpdate.userpass,
        usersexo: this.state.usuarioPasswordUpdate.usersexo,
        useremail: this.state.usuarioPasswordUpdate.useremail,
        userfoto: this.state.usuarioPasswordUpdate.userfoto,
        useradmin: this.state.usuarioPasswordUpdate.useradmin,
        [e.target.name]: e.target.value,
      },
    });
  };

  onClickButtonUpdatePassword = async (e) => {
    e.preventDefault();
    //maneja el click del button para hacer el post del formulario pregunta
    this.setState({
      loading: true,
      error: null,
    });
    try {
      if (this.state.passwordAnterior === this.state.user.userpass) {
        const response = await axios.put(
          `${api_url}/api/usuario/${this.state.usuarioPasswordUpdate.userid}`,
          this.state.usuarioPasswordUpdate
        );
        const { data: usuarioNuevo } = await axios.get(
          `${api_url}/api/usuario/${this.state.user.userid}`
        );
        cookies.set('cookie1', usuarioNuevo, { path: '/' });
        window.location.reload();

        this.setState({
          loading: false,
          error: null,
        });
      } else {
        this.setState({
          cambiadoErroneo: true,
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  handleChangePagination = (e, value) => {
    this.state.page = value.activePage;
    this.fetchData();
  };

  onCloseModales = (e) => {
    this.setState({
      cambiadoErroneo: false,
      emailInvalido: false,
    });
  };

  onTabChange = (e, value) => {
    this.setState({
      tab: value.activeIndex,
    });
  };
  editarRespuestaAction = async (
    respuestaID,
    userID,
    preguntaID,
    respTexto
  ) => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const response = await axios.put(
        `${api_url}/api/respuesta/${respuestaID}`,
        {
          userid: userID,
          pregid: preguntaID,
          resptexto: respTexto,
        }
      );

      //window.location.reload();
      this.setState({
        loading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };

  panes = [
    {
      menuItem: { key: 'Perfil', icon: 'user', content: 'Perfil' },
      render: () => (
        <Tab1
          eventoUpdate={this.handleChangeUpdate}
          formValuesUpdate={this.state.usuarioUpdate}
          buttonClickUpdate={this.onClickButtonUpdate}
          eventoUpdatePassword={this.handleChangeUpdatePassword}
          updatePassword={this.onClickButtonUpdatePassword}
          cambiadoErroneo={this.state.cambiadoErroneo}
          onCloseModales={this.onCloseModales}
          handleOnChangeFoto={this.handleOnChangeFoto}
          handleChangeNewPassword={this.handleChangeNewPassword}
          emailInvalido={this.state.emailInvalido}
        />
      ),
    },
    {
      menuItem: {
        key: 'Preguntas',
        icon: 'question circle',
        content: 'Preguntas',
      },
      render: () => (
        <Tab2
          preguntasData={this.state.preguntas}
          onPageChange={this.handleChangePagination}
          total={this.state.totalPreguntas}
          page={this.state.page}
        />
      ),
    },
    {
      menuItem: { key: 'Respuestas', icon: 'talk', content: 'Respuestas' },
      render: () => (
        <Tab3
          respuestasData={this.state.respuestas.data}
          respuestaModificada={this.state.respuestaModificada}
          editarRespuestaHandleChange={this.editarRespuestaHandleChange}
          editarRespuestaAction={this.editarRespuestaAction}
          onPageChange={this.handleChangePagination}
          total={this.state.totalRespuestas}
          page={this.state.page}
        />
      ),
    },
    {
      menuItem: {
        key: 'Preguntas cerradas',
        icon: 'question circle',
        content: 'Preguntas cerradas',
      },
      render: () => (
        <Tab4
          preguntasData={this.state.preguntasCerradas.data}
          onPageChange={this.handleChangePagination}
          total={this.state.totalPreguntasCerradas}
          page={this.state.page}
        />
      ),
    },
    {
      menuItem: {
        key: 'Mensajes',
        icon: 'inbox',
        content: 'Mensajes',
      },
      render: () => (
        <Tab5
          mensajedata={this.state.menUser.data}
          onPageChange={this.handleChangePagination}
          total={this.state.totalMensajes}
          page={this.state.page}
        />
      ),
    },
  ];
  render() {
    if (this.state.loading) return <Loader />;
    if (this.state.error) return <Error />;
    return (
      <div style={{ marginTop: '2em', minHeight: 500 }}>
        <Tab
          menu={{
            style: { backgroundColor: '#283049' },
            inverted: true,
            fluid: true,
            vertical: true,
          }}
          panes={this.panes}
          menuPosition='left'
          onTabChange={this.onTabChange}
          activeIndex={this.state.tab}
        />
      </div>
    );
  }
}

export default Perfil;
