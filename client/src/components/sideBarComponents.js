import {Navbar, Nav, ListGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {NavLink, useParams} from 'react-router-dom';    

function SideBarApp(props){
    const {filterid} = useParams();
    return(
        <Navbar expand="lg"> 
            <Nav className="sidebar">
                <Nav.Item>
                    <ListGroup className='list-group' variant="flush" defaultActiveKey={filterid ? `#filter-${filterid}` : '#filter-all'}>
                        <NavLink to={`/`} onClick={() => props.setBack("/")} className={"active"} style={{ textDecoration: 'none' }}> 
                            <ListGroup.Item className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" role="tab" aria-controls="profile" href='#filter-all'>All</ListGroup.Item>
                        </NavLink>
                        <NavLink to={`/filter/favorites`} onClick={() => props.setBack("/filter/favorites")} style={{ textDecoration: 'none' }}>
                            <ListGroup.Item className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" role="tab" aria-controls="profile" href='#filter-favorites'>Favorites</ListGroup.Item>
                        </NavLink>
                        <NavLink to={`/filter/best-rated`} onClick={() => props.setBack("/filter/best-rated")} style={{ textDecoration: 'none' }}>
                            <ListGroup.Item className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" role="tab" aria-controls="profile" href='#filter-best-rated'>Best Rated</ListGroup.Item>
                        </NavLink>
                        <NavLink to={`/filter/seen-last-month`} onClick={() => props.setBack("/filter/seen-last-month")} style={{ textDecoration: 'none' }}>
                            <ListGroup.Item className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" role="tab" aria-controls="profile" href='#filter-seen-last-month' >Seen Last Month</ListGroup.Item>
                        </NavLink>
                        <NavLink to={`/filter/unseen`} onClick={() => props.setBack("/filter/unseen")} style={{ textDecoration: 'none' }}>
                            <ListGroup.Item  className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" role="tab" aria-controls="profile" href='#filter-unseen'>Unseen</ListGroup.Item>
                        </NavLink>
                    </ListGroup>
                </Nav.Item>        
             </Nav>
      </Navbar>
    )
};


export {SideBarApp};