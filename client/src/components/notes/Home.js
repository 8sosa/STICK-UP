import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {format} from 'timeago.js'
import axios from 'axios'
import Hero from '../Hero'
import { Container, Row, Card, Col, Button } from 'react-bootstrap'
import { RiDeleteBin2Fill } from "react-icons/ri";


export default function Home(){
    const [notes, setNotes] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const getNotes = async (token) =>{
        const res = await axios.get('api/notes', {
            headers:{Authorization: token}
        })
        setNotes(res.data)
    }

    useEffect(() =>{
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if(token){
            getNotes(token)
        }
    }, [])
      

    const deleteNote = async (id) => {
        try {
            if(token) {
                await axios.delete(`api/notes/${id}`, {
                    headers: {Authorization: token}
                })
                getNotes(token)
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        
            <Hero/>
            <Container fluid className='home'>
            <div className='pagediv'>
                <h2 className='createNote d-flex justify-content-center align-items-center pt-3'>ALL NOTES</h2>
                <Row className='homeRow'> 
                    {
                        notes.map(note =>(
                            <Col className='mb-5 mt-5 d-flex justify-content-center align-items-center' key={note._id}>
                                <Card>      
                                    <Card.Header>
                                            <ul id="navHeader" >
                                                <li className='title'><span title={note.title}>{note.title}</span></li>
                                                <li className='close'><Button variant="outline-secondary" onClick={() => deleteNote(note._id)}><RiDeleteBin2Fill/></Button></li>
                                            </ul>
                                    </Card.Header>              
                                    <Card.Body className='cardBody'>
                                            <textarea id={note._id} className='Note-Content' defaultValue={note.content} readOnly/>
                                    </Card.Body>
                                    <Card.Footer>
                                            <Link to={`edit/${note._id}`} className='edit'>Edit</Link>
                                            <p className="date">{format(note.date)}</p>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                </div>
            </Container>
        </>
    )
}