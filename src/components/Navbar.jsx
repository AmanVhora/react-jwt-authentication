import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';

const Navigationbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  let button;
  if (token !== null) {
    button = <>
      <NavLink tag={Link} to="/profile" className='me-3'>Profile</NavLink>
      <Button color="danger" onClick={handleLogout}>Logout</Button> 
    </>
  } else {
    button = <NavLink tag={Link} to="/login">Login</NavLink>
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/about">About us</NavLink>
          </NavItem>
        </Nav>
        {button}
      </Navbar>
    </div>
  );
}

export default Navigationbar;
