import React from 'react'
import Container from 'react-bootstrap/Container'
import hero from '../images/hero.png'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/Button'

export default function Hero() {
  const name = localStorage.getItem('name')
     
  return (
    <>
      <Container fluid>
        <Row className='Hero'>
          <Col className='hero-txt' md={7}>
            <div>
              <h1 className='hero-title'>STICK UP</h1>
              <p className='hero-text'>Welcome back {name}!<br></br>Wanna make some notes? Stick 'em up!</p>
              <Button variant="outline-secondary" href="/create">STICK UP!</Button>
            </div>
          </Col>
          <Col>
            <img src={hero} alt='writing note' className="heroImg ml-auto"/>
          </Col>
        </Row>
      </Container>
    </>
  )
}