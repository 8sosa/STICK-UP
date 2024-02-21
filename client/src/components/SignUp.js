import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Container, Card, Form, Button} from 'react-bootstrap'
// import { onChangeInput, registerSubmit } from '../functions'

export default function SignUp() {

  const [user, setUser] = useState({name: '', email: '', password: ''})
  const [err, setErr] = useState('')
  const [isLogin, setIsLogin] = useState([])
  const navigate = useNavigate();


    if (window.location.pathname === '/register') {
        localStorage.removeItem('tokenStore');
    }

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
        setErr('')
    }

const registerSubmit = async e => {
  e.preventDefault()
  try {
    console.log('first')
      const res = await axios.post('/users/register', {
          username: user.name,
          email: user.email,
          password: user.password
      })
      setUser({name: '',email: '',password: ''})
      setErr(res.data.msg)
      const response = await axios.post('/users/login', {
        email: user.email,
        password: user.password
    })
    localStorage.setItem('tokenStore', response.data.Token)
    localStorage.setItem('name', response.data.name)
    setIsLogin(true)
    navigate('/')
  }catch (err) {
      err.response.data.msg && setErr(err.response.data.msg)
  }
}

  return (
    <>
      <Container className="SignIn">
        <Card className='loginCard'>
          <Card.Header id='logintop'>Sign Up</Card.Header>
          <Card.Body>
            <Form onSubmit={registerSubmit}>
              <Form.Group controlId="register-name">
                <Form.Control
                  className='input-line'
                  type="text"
                  name="name" 
                  placeholder="Username"
                  required
                  value={user.name}
                  onChange={onChangeInput}
                />
              </Form.Group>
              <Form.Group controlId="register-email">
                <Form.Control
                  className='input-line'
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={user.email}
                  onChange={onChangeInput}
                />
              </Form.Group>
              <Form.Group controlId="register-password">
                <Form.Control
                  className='input-line'
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={user.password}
                  autoComplete="true"
                  onChange={onChangeInput}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="outline-secondary" type="submit">Sign Up</Button>
              </div>
            </Form>
          </Card.Body>
          <p>{err}</p>
        </Card>
        <p className='logText'>Already have an account?&nbsp; <a href='/login'>Sign In!</a></p>
      </Container>
    </>
  )
}
