import './App.css';
import { Film } from './filmLibrary'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Slide } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DefaultRoute, FilmRoute, EditRoute, FilmPage, LoginRoute} from './components/filmRoutes';
import { useState , useEffect} from 'react';
import API from './API';


function App() {
  const [films, setFilms] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [back, setBack] = useState("/");
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      await API.getUserInfo(); // we have the user info here
      setLoggedIn(true);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (loggedIn)
      getFilm();
  }, [loggedIn]);


  const getFilm = async (filterid) => {
    if (filterid) {
      const films = await API.getFilterFilms(filterid);
      setFilms(films);
    }
    else {
      const films = await API.getAllFilms();
      setFilms(films);
    }
  };

  // update film
  const updateFilm = (film, filter, editType) => {
    setFilms(oldFilms => {
      return oldFilms.map(f => {
        if (film.id === f.id) {
          const newFilm = new Film(film.id, film.title, film.favorite, film.watchDate, film.rating);
          newFilm.status = 'edited';
          return newFilm;
        }
        else
          return f;
      });
    });

    switch (editType) {
      case 'favorite':
        API.updateFavorite(film).then(() => {
          getFilm(filter);
        }).catch((err) => { toast.error(err.message); });
        break;
      case 'rating':
        API.updateFilm(film).then(() => {
          getFilm(filter);
        }).catch((err) => { toast.error(err.message); });
        break;
      default:
        API.updateFilm(film).then(() => {
          toast.success("Film updated!");
        }).catch((err) => { toast.error(err.message); });
    }
  };


  // delete film
  const deleteFilm = (filmID, filterid) => {
    setFilms((oldFilms) => {
      return oldFilms.map(f => {
        if (f.id === filmID)
          return { ...f, status: 'deleted' };
        else
          return f;
      })
    });
    API.deleteFilm(filmID).then(() => {
      getFilm(filterid);
      toast.success("Film deleted!");
    }).catch((err) => { toast.error(err.message); });
  };

  // add film
  const addFilm = (film) => {
    film.status = 'added';
    setFilms((oldFilms) => [...oldFilms, film]);
    API.addFilm(film).then(() => {
      toast.success("Film added!");
    }).catch((err) => { toast.error(err.message); });
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user.name}!`, type: 'success' });
    } catch (err) {
      console.log(err);
      setMessage({ msg: err, type: 'danger' });
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setFilms([]);
    setMessage('');
  };


  return (
    <BrowserRouter>
      <ToastContainer position="top-right" theme="light" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover={false} limit={3} transition={Slide} />
      <Routes>
        <Route path='/login' element={
          loggedIn ? <Navigate replace to='/' /> : <LoginRoute login={handleLogin} />
        } />
        <Route path='/' element={
          loggedIn ? <FilmRoute /> : <Navigate replace to='/login' />
        } >
          <Route index element={
            loggedIn ? <FilmPage getFilm={getFilm} setFilms={setFilms} films={films} addFilm={addFilm} updateFilm={updateFilm} deleteFilm={deleteFilm} setBack={setBack} /> : <Navigate replace to='/login' />} />
        </Route>
        <Route path='*' element={<DefaultRoute />} />
        <Route path="/add" element={
          loggedIn ? <EditRoute films={films} addFilm={addFilm} updateFilm={updateFilm} back={back} /> : <Navigate replace to='/login' />} />
        <Route path="/edit" element={
        loggedIn ? <EditRoute updateFilm={updateFilm} addFilm={addFilm} back={back} /> : <Navigate replace to='/login' />} />
        <Route path='/filter' element={
        loggedIn ? <FilmRoute /> : <Navigate replace to='/login' />}>
          <Route index element={<h2>Please, specify a filter</h2>} />
          <Route path=':filterid' element={<FilmPage getFilm={getFilm} films={films} setFilms={setFilms} addFilm={addFilm} updateFilm={updateFilm} deleteFilm={deleteFilm} setBack={setBack} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
