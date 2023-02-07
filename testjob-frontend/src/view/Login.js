import React from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Login() {
  return (
    <Container>
      <Row>
        <Col xs={6}>
          <div className='img-container'>
            <img src="https://www.shutterstock.com/image-vector/man-key-near-computer-account-260nw-1499141258.jpg" alt="login-image" width="100%" />
          </div>
        </Col>
        <Col xs={6}>
          <div className="login-form">
          <Form className="p-5">
        <h3>
            Login to DropBox
        </h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <span variant="dark">New Here? <Link to="/signup">Register</Link></span>
    </Form>
          </div>
          </Col>
      </Row>
    </Container>
    
  )
}

export default Login