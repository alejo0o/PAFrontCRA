import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import MainPage from './Pages/Main';
import PreguntaPage from './Pages/Pregunta';
import RespuestasPage from './Pages/Respuesta';
import Buscar from './Pages/Buscar';
import Categorias from './Pages/Categorias';
import Error from './Pages/Error';
import PerfilPage from './Pages/Perfil';
import CategoriasAdmin from './Pages/Administracion/Categorias';
import RespuestasAdmin from './Pages/Administracion/Respuestas';
import PreguntasAdmin from './Pages/Administracion/Preguntas';
import UsuariosAdmin from './Pages/Administracion/Usuarios';
import MejorRespuestaPage from './Pages/MejorRespuesta';
import DisplayPerfil from './Pages/DisplayPerfil';
import Retorno from './Components/BotonRegresar/BotonRegresar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Retorno />
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/pregunta' component={PreguntaPage} />
        <Route exact path='/respuesta/:preguntaID' component={RespuestasPage} />
        <Route exact path='/buscar' component={Buscar} />
        <Route exact path='/categorias' component={Categorias} />
        <Route exact path='/error' component={Error} />
        <Route exact path='/perfil' component={PerfilPage} />
        <Route
          exact
          path='/administracion/categorias'
          component={CategoriasAdmin}
        />
        <Route
          exact
          path='/administracion/respuestas'
          component={RespuestasAdmin}
        />
        <Route
          exact
          path='/administracion/preguntas'
          component={PreguntasAdmin}
        />
        <Route
          exact
          path='/administracion/usuarios'
          component={UsuariosAdmin}
        />
        <Route
          exact
          path='/mejorRespuesta/:preguntaID'
          component={MejorRespuestaPage}
        />
        <Route exact path='/DisplayPerfil/:Userid' component={DisplayPerfil} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
