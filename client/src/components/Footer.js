import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as Icon from 'react-bootstrap-icons';


export default function Footer() {
  return (
      <Container fluid className='footer'>
        <Row>
            <Col className='copyright pl-3'><Icon.CCircle/> STICK UP!</Col>
            <Col className="sicons"> <Icon.Twitter/> <Icon.Instagram/> <Icon.Facebook/>  </Col>
        </Row>
    </Container>
    
  )
}
