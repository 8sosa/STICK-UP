import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Logo from '../../images/stickuplogo.png';
import { CiLogout } from 'react-icons/ci';
import DirectoryModal from '../DirectoryModal';

export default function Navb() {
  
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false);
  const [directories, setDirectories] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [note, setNote] = useState({title: '',content: '',directory: '',date: ''});

  const checkLogin = async () =>{
    const token = localStorage.getItem('tokenStore')
    if(token){
      const verified = await axios.get('/users/verify',{
        headers:{ Authorization: token}
      })
      setIsLogin(verified.data)
      if(verified.data === false) {
        localStorage.removeItem('tokenStore');
      }
    }else{
      setIsLogin(false)
    }
  }


  const onChangeSelectInput = (eventKey) => {
    setSelectedOption(eventKey);
    setNote({ ...note, directory: eventKey });
  };
  const logoutSubmit = () => {
    localStorage.clear();
    navigate('/')
  };


  const getDirectories = async (token) =>{
    const res = await axios.get('/directory/', {
        headers:{Authorization: token}
    })
    setDirectories(res.data)
}

useEffect(() =>{
  checkLogin();
  const token = localStorage.getItem('tokenStore')
  if(token){
      getDirectories(token)
  }
}, [directories])



  useEffect(() => {
    if (selectedOption === 'CreateDirectory') {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [selectedOption]);

  return (
    <>
        <Navbar expand="md">
          <Navbar.Brand href="/" >
            <img src={Logo} alt='logo' className="logo"/>
          </Navbar.Brand>
            {isLogin 
            ?
              <>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="responsive-nav">
                <Nav className="d-flex flex-row navbar-links mx-auto">
                  <Nav.Link href="/" className='m-1'>Home</Nav.Link>
                  <NavDropdown className='m-1' title="Folders" id="Folders-dropdown" name="directory" onSelect={onChangeSelectInput} required>
                    {directories.length === 0 ? (
                      <NavDropdown.Item><p>No Folders yet...</p></NavDropdown.Item>
                    ) :(
                        <div>
                          <NavDropdown.Item href="/notes">All Folders</NavDropdown.Item>
                          <NavDropdown.Divider />
                          {directories.map(directory =>(
                          <NavDropdown.Item key={directory._id} onClick={()=> navigate(`/dirnotes/${directory._id}`)}>{directory.name}</NavDropdown.Item>
                        ))}
                        </div>
                      )}
                  </NavDropdown>
                  <NavDropdown className='m-1' title="Create" id="create-dropdown" name="directory" onSelect={onChangeSelectInput} required>
                    <NavDropdown.Item href="/create">Create A New Note</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="CreateDirectory">Create A New Directory</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav.Link href="/" onClick={logoutSubmit} className="d-flex flex-row justify-content-end ms-auto">
                  <CiLogout size={25} />
                  <p>Logout</p>
                </Nav.Link>
                </Navbar.Collapse>
              </>
            :
            <Button variant="outline-secondary" href='/login'>Login</Button>
            }          
        </Navbar>
      {show && <DirectoryModal setShow={setShow} show={show} />}
    </>
  );
}
