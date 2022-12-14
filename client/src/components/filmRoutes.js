import { Container, Row, Col } from 'react-bootstrap';
import { SideBarApp } from './sideBarComponents';
import { NavBarApp } from './navBarComponents';
import { FilmApp } from './filmComponents';
import { LoginForm } from './authenticationComponents';
import { FilmForm } from './filmForm';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function DefaultRoute(props) {
    return (
        <Container className='App'>
            <h1>No data here</h1>
        </Container>
    );
};

function FilmRoute(props) {
    return (
        <Container fluid className='App'>
            <Row>
                <NavBarApp logout={props.logout} />
            </Row>
            <Outlet />
        </Container>
    );
};


function EditRoute(props) {
    return (
        <Container fluid className='App'>
            <Row>
                <NavBarApp logout={props.logout} />
            </Row>
            <Row>
                <Col className='col-9 mt-5 g-5' >
                    <FilmForm films={props.films} addFilm={props.addFilm} updateFilm={props.updateFilm} back={props.back} />
                </Col>
            </Row>
        </Container>
    );
};


function FilmPage(props) {
    const { filterid } = useParams();

    useEffect(() => {
        props.getFilm(filterid);
    }, [filterid]);

    return (
        <Row>
            <Col xs='auto'>
                <SideBarApp setBack={props.setBack} />
            </Col>
            <Col className='col-9 mt-5 g-5' >
                <FilmApp films={props.films} addFilm={props.addFilm} updateFilm={props.updateFilm} deleteFilm={props.deleteFilm} />
            </Col>
        </Row>
    );
};

function LoginRoute(props) {
    return (
        <Container fluid className='App'>
            <Row>
                <Col className='mt-3'>
                    <h1>Login</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <LoginForm login={props.login} />
                </Col>
            </Row>
        </Container>
    );
}


export { DefaultRoute, FilmRoute, EditRoute, FilmPage, LoginRoute };
