import {Button, Form, FloatingLabel, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';
import {Film} from './../filmLibrary'
import { Link, useNavigate, useLocation } from 'react-router-dom';


function FilmForm(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);

  const [id, setId] = useState(location.state ? location.state.film.id : '');
  const [title, setTitle] = useState(location.state ? location.state.film.title : '');
  const [favorite, setFavorite] = useState(location.state ? location.state.film.favorite : false);
  const [watchdate, setWatchDate] = useState(location.state ? dayjs(location.state.date) : dayjs());
  const [rating, setRating] = useState(location.state ? location.state.film.rating : 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const film = new Film(id, title, favorite, watchdate, rating);
    
    if(location.state){
      props.updateFilm(film, props.back);
      navigate(props.back);
    }
    else{
      if(props.films.some(f => f.id === id)){
        setError(true);
      }
      else{
        props.addFilm(film);
        navigate(props.back);
      }
    }  
  }

  return(
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Row xs="auto">
          <Form.Label className='form-title'>New Film</Form.Label>
        </Row>
        <Row className="g-2">
          <Col>
            <Form.Group className="mb-3">
              <FloatingLabel label="Film ID" className="mb-3">
                  <Form.Control value={id} disabled={location.state ? true : false} required={true} isInvalid={error} type="text" maxLength={5} placeholder="film-id" onChange={event => setId(event.target.value)}/>
                  <Form.Control.Feedback type="invalid">
                    Film ID already exists
                  </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <FloatingLabel label="Film title" className="mb-3">
                  <Form.Control value={title} required={true} type="text" maxLength={50} placeholder="film-id" onChange={event => setTitle(event.target.value)}/>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-3">
          <Col>
            <Form.Group className="mb-3">
              <FloatingLabel label="Date" className="mb-3">
                  <Form.Control value={watchdate.format('YYYY-MM-DD')} type="date" placeholder="watched date" onChange={event => setWatchDate(dayjs(event.target.value))}/>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <FloatingLabel label="Film rating" className="mb-3">
                  <Form.Control value={rating} type="number" min={0} max={5}  onChange={event => setRating( Number(event.target.value))}/>
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
                <Form.Label>Favorite</Form.Label>
                <Form.Check type="checkbox" id="inlineFormCheck" value={favorite} onChange={event => setFavorite(event.target.checked)}/>
            </Form.Group>
          </Col>
        </Row>
        <Row xs="auto">
          <Col>
              <Button variant="primary" type="submit">Save</Button> &ensp;
          <Link to={`${props.back}`}>
            <Button variant='danger'>Cancel</Button>
          </Link>
          </Col>         
        </Row>
      </Form>
  );
};

export {FilmForm};