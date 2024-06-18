import { useState, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/formContainer";
import {useAdminLoginMutation} from '../Slices/usersApiSlice';
import { toast } from "react-toastify";
import { ComponentContext } from "../AdminDatas/datas";

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate=useNavigate()
    
    const [adminLoginApi]=useAdminLoginMutation()

    const { value, setValue } = useContext(ComponentContext)

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
      }else if (password.trim().length < 6) {
       
        toast.error('Password must be at least 6 characters long');
        return
      }
        
      
        try {

            const datas=await adminLoginApi({email,password}).unwrap();

            //console.log(11234,datas);
            
            setValue(datas)
            navigate('/admin');

            

        } catch (err) {
            //console.log(12345,err);
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
