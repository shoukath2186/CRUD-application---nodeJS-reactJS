import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from "../components/formContainer";
import { useLoginMutation } from "../Slices/usersApiSlice";
import { setCredentials } from "../Slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/loading";

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate=useNavigate()
    const dispatch=useDispatch();

    const [login, {isLoading}]=useLoginMutation();

    const {userInfo}=useSelector((state)=>state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[navigate,userInfo])

    const HadilSubmit =async (e) => {
        e.preventDefault()

          
      if (!email.trim()) {
        toast.error('Email is required');
        return;
       }
       if(!CheckRegex(email)){
        toast.error("Invalid Email Format.");
         return; 
       }
      
      if (!password.trim()) {
        toast.error('Password is required');
        return;
      }else if (password.trim().length < 8) {
       
        toast.error('Password must be at least 8 characters long');
        return
      }
        
      
        try {
            const res=await login({email,password}).unwrap();
            //console.log('login',res);
            dispatch(setCredentials({...res}));
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message||err.error);
        }
       
    }
    function CheckRegex(email) {
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
       return emailRegex.test(email);

    }

    return (
        <FormContainer >
            <h1>Sign In</h1>

            <Form onSubmit={HadilSubmit}>
                <Form.Group className='my-2' controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                 {isLoading && <Loader/>}
                <Button type="submit" variant="primary" className="mt-3">
                    Sign In
                </Button>

                <Row className="py-3">
                    <Col>
                        New Customer? <Link to='/register'>Register</Link>
                    </Col>
                </Row>


            </Form>
        </FormContainer>
    )
}

export default LoginScreen;
