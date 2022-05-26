import {Button, Col, Container, Form, FormCheck, Table} from 'react-bootstrap';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Rating } from 'react-simple-star-rating'
import 'bootstrap/dist/css/bootstrap.min.css';
import { PencilSquare, Trash3Fill} from 'react-bootstrap-icons';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Film } from './../filmLibrary'
import { Link, useParams } from 'react-router-dom';


function FilmApp(props) {
    const {filterid} = useParams();
    return(
        <Col>
            <FilmTable films = {props.films} filter={filterid} deleteFilm={props.deleteFilm} addFilm={props.addFilm} updateFilm={props.updateFilm} className = 'table'> </FilmTable>
        </Col>
    )
};

function FilmTable(props){
    const HandleName = (f) =>{
        switch (f) { 
            case 'favorites': 
                return "Favorites";
            case 'best-rated': 
                return "Best Rated";
            case 'seen-last-month': 
                return "Seen Last Month";
            case 'unseen': 
                return "Unseen";
            default: return "All";
        }

    }

    return(
        <Container>
            <Table responsive="sm" hover>
                <thead>
                    <tr>
                        <th>{HandleName(props.filter)}</th>
                    </tr>
            </thead>
            <tbody>
                { props.films.map((film) => <FilmRow film={film} key={film.id} deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} filter={props.filter}/>) }
            </tbody>
            </Table>
            <Link to='/add'>
                <PlusCircleFill className='justify-content-end' color='#1266F1' size={35}/>
            </Link>    
        </Container>
    )
};


function FilmRow(props) {
    let statusClass = null;

    switch(props.film.status){
        case 'added':
            statusClass = 'table-success';
            break;
        case 'edited':
            statusClass = 'table-warning';
            break;
        case 'deleted':
            statusClass = 'table-danger';
            break;
        default: break;
    }

    return(
        <tr className={statusClass}>
            <FilmData film={props.film} deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} filter={props.filter}/>
        </tr>
        )
};

function FilmData(props){
    const [fav, setFav] = useState(props.film.favorite)

    // Catch Rating value
    const handleFav = (fav) => {
        setFav(fav);
        props.updateFilm(new Film(props.film.id, props.film.title, fav, props.film.watchDate, props.film.rating));
    }
    
    return(
    <>
        <td align="left">
            <Link to={'/edit'} state={ {film: props.film, date: dayjs(props.film.watchDate).format('YYYY-MM-DD') } } >
                <Button variant="outlined"> <PencilSquare/> </Button>
            </Link>
            <Button variant="outlined" onClick={() => props.deleteFilm(props.film.id, props.filter)}><Trash3Fill /> </Button> 
            <span className={fav ? "favorite" : "favoriteb" }>{props.film.title}</span>
        </td> 
        <td> 
            <Form>
                <Form.Group>
                    <FormCheck type="checkbox" 
                    defaultChecked={fav} 
                    onChange = {event => handleFav(event.target.checked)}/> 
                    Favorite
                </Form.Group>
            </Form>
        </td>
        <td> {props.film.watchDate ? dayjs(props.film.watchDate).format("YYYY-MM-DD") : "" } </td>
        <td> <StarRating film={props.film} updateFilm={props.updateFilm}/> </td>
    </>);
};


function StarRating(props) {
    const [rating, setRating] = useState(props.film.rating) // initial rating value
  
    // Catch Rating value
    const handleRating = (rate) => {
        const starValue = 20;           // rate range from 0 to 100 (each star has value = 20)
        setRating(rate/starValue);
        props.updateFilm(new Film(props.film.id, props.film.title, props.film.favorite, props.film.watchDate, rate/starValue));
    }
  
    return (
      <div className='App'>
        <Rating ratingValue={0} initialValue={rating} size={30} fillColor='orange' emptyColor='gray' onClick={handleRating}/>
      </div>
    )
};

export {FilmApp};