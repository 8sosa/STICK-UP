import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';
import { Container, Row, Card, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import checkLogin from './auth';
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";


export default function NotesPage() {
  const params = useParams();
  const directory_id = params.directory;
  const [notes, setNotes] = useState([]);
  const [directoryName, setDirectoryName] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('tokenStore');

  const getDirectoryNotes = async (token) => {
    try {
      const res = await axios.get(`/directory/${directory_id}/notes`, {
        headers: { Authorization: token },
      });
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getDirectoryName = async (token) => {
    try {
      const res = await axios.get(`/directory/${directory_id}`, {
        headers: { Authorization: token },
      });
      setDirectoryName(res.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`api/notes/${id}`, {
          headers: { Authorization: token },
        });
      }
    } catch (error) {
      window.location.href = '/';
    }
  };
  const deleteFolder = async (id) => {
    try {
      if (token) {
        await axios.delete(`/directory/${id}`, {
          headers: { Authorization: token },
        });
        navigate('/notes')
      }
    } catch (error) {
      window.location.href = '/';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const isUserLoggedIn = await checkLogin();
        if (isUserLoggedIn) {
          getDirectoryNotes(token)
          getDirectoryName(token)
        } else {
            navigate('/login')
        }
    }
    
    fetchData();
  }, [directory_id]);

  return (
    <>
      <Container fluid className='Page'>
        <div className='pagediv'>
          <div className='topper'>
            <h2 className='createNote d-flex justify-content-center align-items-center pt-3'>{directoryName}</h2>
            <Button variant='outline-secondary' onClick={() => deleteFolder(directory_id)}><RiDeleteBin2Fill /></Button>
          </div>
          <Row>
            <Col className='mb-5 mt-5 d-flex justify-content-center align-items-center'>
              <Card onClick={() => navigate('/create')}>
                <IoAdd />
                <p>Create Note</p>
              </Card>
            </Col>
            {notes.map((note) => (
              <Col className='mb-5 mt-5 d-flex justify-content-center align-items-center' key={note._id}>
                <Card>
                  <Card.Header>
                    <ul id='navHeader'>
                      <li className='title'><span title={note.title}>{note.title}</span></li>
                      <li className='close'>
                        <Button variant='outline-secondary' onClick={() => deleteNote(note._id)}>
                          <RiDeleteBin2Fill />
                        </Button>
                      </li>
                    </ul>
                  </Card.Header>
                  <Card.Body className='cardBody'>
                    <textarea id='Note-Content' defaultValue={note.content} readOnly/>
                  </Card.Body>
                  <Card.Footer>
                    <p onClick={() => navigate(`/edit/${note._id}`)} className='edit'>Edit</p>
                    <p className='date'>{format(note.date)}</p>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
}
