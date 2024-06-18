import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/formContainer";
import { toast } from "react-toastify";
import { useAdminAddUserMutation } from "../Slices/usersApiSlice";
import { ComponentContext } from "../AdminDatas/datas";


const AddUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [conformPassword, setConformPassword] = useState('')

    
    const navigate=useNavigate()

    const { value, setValue } = useContext(ComponentContext)
    
    const [addUser]=useAdminAddUserMutation()

    
    

    

    const HadilSubmit =async (e) => {
        e.preventDefault()


        if (!name.trim()) {            
            toast.error('Name is required');
            return
          }
      
          // Validate email
          if (!email.trim()) {         
            toast.error('Email is required');
            return
          } else if (!validateEmail(email)) {         
            toast.error('Invalid email format');
            return
          }
           

          // Validate password
    if (!password.trim()) {
        toast.error('Password is required');
        return
      } else if (!validatePassword(password)) {
        toast.error('Password must be at least 8 characters long and contain at least one number and one special character');
        return
      }
      if (!conformPassword.trim()) {
        toast.error('Conformpassword is required');
        return
      }

        
        if(password !== conformPassword){
            toast.error('Password do not match')
        }else{
            try {
              
              const datas=await addUser({name,email,password}).unwrap();
              setValue(datas)
                
              navigate('/admin');

            } catch (err) {
                toast.error(err?.data?.message||err.error);
            }
        }
        
    }


    

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
      };
    
      const validatePassword = (password) => {
        
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
      };

    return (
        <FormContainer>
            <h1>Add new User</h1>
 
            <Form onSubmit={HadilSubmit}>
                <Form.Group className='my-2' controlId="name">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

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
                 
                <Form.Group className='my-2' controlId="conformPassword">
                <Form.Label>conform Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter conforme Password"
                    value={conformPassword}
                    onChange={(e) => setConformPassword(e.target.value)}
                ></Form.Control>
                </Form.Group>

               

                <Button type="submit" variant="primary" className="mt-3">
                    Submit
                </Button>

                


            </Form>
        </FormContainer>
    )
}

export default AddUser    ;

