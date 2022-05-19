import { Container, Row, Col } from 'react-bootstrap';
import { SideBarApp } from './sideBarComponents';
import { NavBarApp } from './navBarComponents';
import { FilmApp } from './filmComponents';
import { FilmForm } from './filmForm';
import { Outlet } from 'react-router-dom';
import API from '../API';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';


function DefaultRoute(props){
    return(
        <Container className='App'>
            <h1>No data here</h1>
        </Container>
    );
};

function FilmRoute(props){
    return(
        <Container fluid className='App'>
            <Row>
                <NavBarApp/>
            </Row>
                <Outlet/>
        </Container>
    );
};


function EditRoute(props){
    return(
        <Container fluid className='App'>
        <Row>
            <NavBarApp/>
        </Row>
        <Row>           
            <Col className='col-9 mt-5 g-5' >
                <FilmForm films={props.films} addFilm={props.addFilm} updateFilm={props.updateFilm} back={props.back}/>
            </Col>
        </Row>
        </Container>
    );  
};


function FilmPage(props){

    const {filterid} = useParams();

    useEffect(()=>{
        const getFilm = async () => {
            if(filterid){
          const films = await API.getFilterFilms(filterid);
          props.setFilms(films);
            }
            else{
            const films = await API.getAllFilms();
            props.setFilms(films);
            }
        };
        getFilm();
    }, [filterid]); 

    return(
        <Row>        
            <Col xs='auto'>
                <SideBarApp setBack={props.setBack}/>
            </Col>
            <Col className='col-9 mt-5 g-5' >
              <FilmApp films={props.films} addFilm={props.addFilm} updateFilm={props.updateFilm} deleteFilm={props.deleteFilm}/>
            </Col>
        </Row>   
    );
};


export {DefaultRoute, FilmRoute, EditRoute, FilmPage};
