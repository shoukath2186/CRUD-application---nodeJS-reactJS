import { Container, Nav, Navbar} from "react-bootstrap"
import { FaSignInAlt} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap'
import React,{useContext} from "react";
import { ComponentContext } from "../AdminDatas/datas";
import { useAdminlogoutMutation } from "../Slices/usersApiSlice";
import { useNavigate } from "react-router";


const Header= ()=>{


  const { value, setValue } = useContext(ComponentContext)

  const [adminLogout]=useAdminlogoutMutation()

  const navigate=useNavigate()
   
  console.log(value);

   const logout=async ()=>{
    try {
      //console.log(111);
      await adminLogout().unwrap();
      //console.log(222);
      setValue(null);
      navigate('/admin/login');
    } catch (error) {
      console.log(error);
    }
    //navigate('/admin');

   }

    return(
        <header style={{marginTop:'-65px'}}>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
              <Container>

              <LinkContainer to='/admin'>
              <Navbar.Brand>ADMIN page</Navbar.Brand>
              </LinkContainer>
                
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                   <Nav className='ms-auto'>
                    {value?(
                       <>
                      
                      <Nav.Link onClick={logout}>
                         < FaSignInAlt/>Log Out
                      </Nav.Link>
                     
                       </>
                    ):(
                      <>
                      <LinkContainer  to='/admin/login'>
                      <Nav.Link >
                         <FaSignInAlt/>Sign In
                      </Nav.Link>
                      </LinkContainer>
 
                      </>
                    )}
                      
                     
                   </Nav>
                </Navbar.Collapse>
                
              </Container>
            </Navbar>
        </header>
    )
}

export default Header