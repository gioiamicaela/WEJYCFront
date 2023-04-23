import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/tokenSlice';

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <Navbar expand='lg'>
      <Container>
        <Link to='/'>
          <Navbar.Brand
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              fontFamily: 'Barlow, sans-serif',
            }}
            className='text-center'
          >
            <img width={40} src='../logo.png' alt='logo' className='mx-2' />
            Prueba
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link
              as={Link}
              to={'/'}
              style={{ color: 'rgba(255,255,255,.5)' }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={'/login'}
              style={{ color: 'rgba(255,255,255,.5)' }}
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={Link}
              onClick={handleLogout}
              style={{ color: 'rgba(255,255,255,.5)' }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
