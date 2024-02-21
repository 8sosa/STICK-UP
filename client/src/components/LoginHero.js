import React from 'react'
import Container from 'react-bootstrap/Container'
import hero from '../images/hero.png'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/Button'

export default function LoginHero() {
  return (
    <>
      <Container fluid className='Hero'>
        <Row className='p-5'>
        <Col className='Hero-txt' xs={7}>
          <div>
            <h1 className='hero-title'>STICK UP</h1>
            <p className='hero-text'>Hello user!<br></br>Wanna make some notes? <br></br> Stick Up is a small start up dedicated to helping those who need a platform to make notes and be reminded constantly about them.<br></br> What are you waiting for? <br></br>Stick 'em up!</p>
            <Button variant="outline-secondary" href="/login">Login</Button>
          </div>
        </Col>
        <Col>
          <card className="heroImg ml-auto">
            <img src={hero} alt='writing note'/>
          </card>
        </Col>
        </Row>
      </Container>
    </>
  )
}

