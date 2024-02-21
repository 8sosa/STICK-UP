import React, { useEffect, useState} from 'react'
import axios from 'axios'
import {Container, Card, Form, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const [user, setUser] = useState({name: '', email: '', password: ''})
  const [err, setErr] = useState('')
  const [isLogin, setIsLogin] = useState([])
  const navigate = useNavigate();

  const checkLogin = async () =>{
    const token = localStorage.getItem('tokenStore')
    if(token){
      const verified = await axios.get('/users/verify',{
        headers:{ Authorization: token}
      })
      setIsLogin(verified.data)
      console.log(isLogin)
      if(verified.data === false) {
        localStorage.removeItem('tokenStore');
      }
    }else{
      setIsLogin(false)
    }
  }

  if (window.location.pathname === '/login') {
    localStorage.removeItem('tokenStore');
    localStorage.removeItem('name');
}

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
        setErr('')
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/users/login', {
                email: user.email,
                password: user.password
            })
            setUser({name: '',email: '',password: ''})
            localStorage.setItem('tokenStore', res.data.Token)
            localStorage.setItem('name', res.data.name)
            setIsLogin(true)
            navigate('/')
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    useEffect(() => {
      const fetchData = async () => {
        await checkLogin();
      };
  
      fetchData();
    }, [user]);
  return (
    <>
      <Container className="SignIn" centered>
        <Card className='loginCard'>
          <Card.Header id='logintop'>Login</Card.Header>
          <Card.Body>
            <Form onSubmit={loginSubmit}>
              <Form.Group controlId="login-email">
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

              <Form.Group controlId="login-password">
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
              <Button variant="outline-secondary" type='submit'>
                Sign In
              </Button>
              </div>
            </Form>
          </Card.Body>
          <p>{err}</p>
        </Card>
        <p className='logText'>Don’t have an account?&nbsp; <a href='/register'>Sign up!</a></p>
      </Container>
    </>
  )
}
