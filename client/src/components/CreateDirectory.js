import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

export default function CreateDirectory() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setMessage('');
  }
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState('')
  const [directory, setDirectory] = useState({
    name: ''
  })

    const ChangeInput = d => {
        const {name, value} = d.target;
        setDirectory({...directory, [name]:value})
    }


    const CreateDirectory = async e => {
        e.preventDefault()
        try{
            const token = localStorage.getItem('tokenStore')
            if(token){
                const res = await axios.post('/directory', directory, {
                    headers: {Authorization: token}
                })
                alert(directory.name)
                setDirectory({name: ''})
                setMessage(res.data.msg)

            }
        } catch (err) {
            console.log(err);
        }
    }


  return (
    <>
      <Button variant="outline-secondary" onClick={handleShow}>
        Create Directory
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form  >
          {
            message ?<Alert variant='secondary'>{message}</Alert> : <></>
          }
          <Modal.Header closeButton>
            <Modal.Title>Create Directory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Directory Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={directory.name}
                  onChange={ChangeInput}
                  placeholder="New directory"
                />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type='submit' onClick={CreateDirectory}>Save Directory</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}