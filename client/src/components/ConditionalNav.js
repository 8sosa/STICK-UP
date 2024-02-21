import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from './notes/Nav'


function ConditionalNav() {
  const location = useLocation();

  const isLoginRoute = location.pathname.includes('/login');
  const isRegisterRoute = location.pathname.includes('/register');

  // Hide the navbar when the location pathname includes /login
  if (isLoginRoute || isRegisterRoute) {
    return null;
  } else {
    return <Nav />;
    }
  
}

export default ConditionalNav;
