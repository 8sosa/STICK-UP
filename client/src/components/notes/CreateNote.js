import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Container, Card, Form, Button} from 'react-bootstrap'
import DirectoryModal from '../DirectoryModal';

export default function CreateNote() {
    const [note, setNote] = useState({title: '',content: '',directory: '',date: ''})
    const [directories, setDirectories] = useState([]);
    const [show, setShow] = useState(false)

    const navigate = useNavigate()

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

    const CreateNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title, content, directory, date} = note;
                const newNote = {
                    title, content, directory, date
                }
                await axios.post('/api/notes', newNote, {
                    headers: {Authorization: token}
                })
                return navigate.push('/notes')
            }
        } catch (err) {
            console.error(err);
        }
    }

    const getDirectories = async (token) =>{
        const res = await axios.get('/directory', {
            headers:{Authorization: token}
        })
        setDirectories(res.data)
    }
    useEffect(() => {
        const token = localStorage.getItem('tokenStore');
        getDirectories(token);
      }, []);
    return (
        <div className='create-note'>
            <h2 className='createNote d-flex justify-content-center align-items-center'>Create Note</h2>
            <Container className='d-flex justify-content-center align-items-center mb-5 mt-5'>
                <Form  onSubmit={CreateNote} autoComplete = "off">
                <Card className='createCard'>
                    <Card.Header className='cardHeader'>
                        <div>
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
                        </div>
                    </Card.Header>                    
                    <Card.Body className='cardBody'>
                        <Form.Group controlId="Note-Content">
                            <Form.Control
                            className='input'
                            as="textarea"
                            type="text"
                            value={note.content}
                            placeholder="Note Content..."
                            name='content' 
                            required 
                            rows="10"
                            onChange={onChangeInput} />
                        </Form.Group>
                    </Card.Body>    
                    <Card.Footer className='createCardFooter'>
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
            </Container>
        </div>
    )
}