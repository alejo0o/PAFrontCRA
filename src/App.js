import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import MainPage from './Pages/Main';
import PreguntaPage from './Pages/Pregunta';
import RespuestasPage from './Pages/Respuesta';
import Buscar from './Pages/Buscar';
import Categorias from './Pages/Categorias';
import Error from './Pages/Error';
import Perfil from './Pages/Perfil';
import CategoriasAdmin from './Pages/Administracion/Categorias';
import RespuestasAdmin from './Pages/Administracion/Respuestas';
import PreguntasAdmin from './Pages/Administracion/Preguntas';
import UsuariosAdmin from './Pages/Administracion/Usuarios';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/pregunta' component={PreguntaPage} />
        <Route exact path='/respuesta/:preguntaID' component={RespuestasPage} />
        <Route exact path='/buscar' component={Buscar} />
        <Route exact path='/categorias' component={Categorias} />
        <Route exact path='/error' component={Error} />
        <Route exact path='/perfil' component={Perfil} />
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
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
