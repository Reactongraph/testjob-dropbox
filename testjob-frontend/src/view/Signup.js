import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Signup() {
  return (
    <Container>
      <Row>
        <Col xs={6}>
          <div className='img-container'>
            <img src="https://www.shutterstock.com/image-vector/man-key-near-computer-account-260nw-1499141258.jpg" alt="login-image" width="100%" />
          </div>
        </Col>
        <Col xs={6}>
        <Form className="p-5">
        <div className="login-form">
        <h3>
            Signup to DropBox
        </h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter First Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter last Name" />
      </Form.Group>

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
      <Button variant="primary" type="submit">
        Signup
      </Button>
      <span  variant="dark">Already User? <Link to="/login">Sign-In</Link></span>
      </div>
    </Form>
          </Col>
      </Row>
    </Container>
    
  )
}

export default Signup