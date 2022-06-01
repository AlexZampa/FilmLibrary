import {Navbar, Form, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Film, PersonCircle} from 'react-bootstrap-icons';

function NavBarApp(props){
    return(
        <Navbar expand="lg" bg="primary" variant="dark" fixed="top">
            <Navbar.Brand href="#home">
                <Film color="white" size={25}/>
                <span> Film Library</span>
            </Navbar.Brand>
            <Navbar.Collapse>
                <Form className='mx-auto'>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Search"/>
                    </Form.Group>
                </Form>
            </Navbar.Collapse>
                <Navbar.Brand href="#account" className='justify-content-end'>
                    <NavDropdown className='navbar-dropdown-item' drop='down' title={<PersonCircle color='white' size={25}/>} id="basic-nav-dropdown">
                        <NavDropdown.Item  href="#logout" onClick={props.logout}>logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Brand>
      </Navbar>
    )
};


export {NavBarApp};