import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { Card, Container, Form, Button, Row, Col} from 'react-bootstrap';
import DirectoryModal from '../DirectoryModal';
import checkLogin from './auth.js'

export default function Edit() {
    const {id} = useParams();
    const [note, setNote] = useState({title: '',content: '',date: '',directory: '',id: ''})
    const [directories, setDirectories] = useState([]);
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const token = localStorage.getItem('tokenStore');


    const getNote = async () =>{
        if (id) {
            const res = await axios.get(`/api/notes/${id}`, {
                headers: {Authorization: token}
            })
            setNote(res.data)
        }
    }

    const onChangeInput = e => {
        const {name, value} = e.target;
        setNote({...note, [name]:value})
    }

    const onChangeSelectInput = e => {
        const {name, value} = e.target;
        if (value === 'CreateDirectory'){
            setShow(true)
        }
        setNote({...note, [name]:value})
    }

    const editNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title, content, date, directory} = note;
                const newNote = {title, content, date, directory}

                await axios.put(`/api/notes/${id}`, newNote, {
                    headers: {Authorization: token}
                })
                return navigate.push('/')
            }
        } catch (err) {
            console.log(err)
        }
    }
    const getDirectories = async (token) =>{
        const res = await axios.get('/directory', {
            headers:{Authorization: token}
        })
        setDirectories(res.data)
    }

    useEffect(() => {
        const fetchData = async () => {
          const isUserLoggedIn = await checkLogin();
            if (isUserLoggedIn) {
                getNote(token)
                getDirectories(token)
            } else {
                navigate('/')
            }
        }
        
        fetchData();
      }, [id]);
    return (
        <>
            <Container className='edit-note'>
                <h2 className='editNote d-flex justify-content-center align-items-center'>Edit Note</h2>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='mb-5 mt-5 justify-content-center'>
                        <Form onSubmit={editNote} autoComplete="off">
                            <Card className='editCard'>
                                <Card.Header className='cardHeader'>
                                    <Form.Group controlId="Note-title">
                                        <Form.Control
                                            type="text" 
                                            value={note.title}
                                            name="title"
                                            required 
                                            onChange={onChangeInput}
                                            placeholder="Note Title..."
                                        />
                                    </Form.Group>
                                    <DirectoryModal setShow={setShow} show={show}/>
                                    <Form.Group controlId='Note-directory'>
                                    <Form.Select 
                                        value={note.directory}
                                        name='directory'
                                        onChange={onChangeSelectInput}
                                        required
                                    >
                                        <option value="">Select Folder</option>
                                        {directories.map(directory => (
                                            <option key={directory._id} value={directory._id}>{directory.name}</option>
                                        ))}
                                        <option value='CreateDirectory' name='directory'>Create A New Directory</option>
                                    </Form.Select>
                                    </Form.Group>
                                </Card.Header>  
                                <Card.Body className='cardBody'>
                                    <Form.Group>
                                        <Form.Control 
                                            type="text"
                                            as="textarea"
                                            id="Note-Content"
                                            value={note.content}
                                            name='content' 
                                            required 
                                            rows="10"
                                            onChange={onChangeInput} />
                                    </Form.Group>
                                </Card.Body>
                                <Card.Footer className='editCardFooter text-right'>
                                    <Form.Group controlId="date">
                                        <Form.Control 
                                        type="date"
                                        value={note.date}
                                        name="date"
                                        required 
                                        onChange={onChangeInput} />
                                    </Form.Group>     
                                </Card.Footer>  
                            </Card>
                            <div className='text-center mb-5 mt-4'>
                                <Button variant="outline-secondary" type='submit' > Stick! </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Container>
        </>
    )
}