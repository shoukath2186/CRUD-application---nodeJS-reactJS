import React,{useContext,useState} from "react";
import { Button, Card, Container } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import { ComponentContext } from "../AdminDatas/datas";
import { useAdminDeleteMutation, useAdminLoginMutation } from "../Slices/usersApiSlice";
import './style.css';
import { useNavigate } from "react-router-dom";


const Hero = () => {


    const { value, setValue } = useContext(ComponentContext)

    const [userdata,setUserData]=useState(value)

     const [DeleteData]=useAdminDeleteMutation()

      const navigate=useNavigate()
        
    
    const handleDelete=(id)=>{
        
        const handile=async ()=>{
            //console.log(id);
        try {
          
            const data=await DeleteData({id:id}).unwrap();
           //console.log(data);
            setValue(data)
            setUserData(data)
            navigate('/admin');
            
        } catch (error) {
            console.log(error);
            
        }
    }
    handile()
    }

    function handleEdit(userData){
       
      navigate('/admin/edit', { state: { Data: userData } });

    } 
    const handilSearch=(e)=>{
        const val=e.target.value

        const filtered = value.filter(
            (user) =>
              user.name.toLowerCase().includes(val.toLowerCase()) ||
            user.email.toLowerCase().includes(val.toLowerCase())
             
          );
          setUserData(filtered)
    }


    const [adminLoginApi]=useAdminLoginMutation()


    async function resetData(){
      try {
        const datas=await adminLoginApi({
          email:'admin@gmail.com',
          password:'admin123'
        }).unwrap();

        setValue(datas)
        setUserData(datas)

      } catch (error) {
        console.log(error);
      }
     
    }
    
    return (
       
      <div className=' py-5'>
         

         {value?(
            <>
     <div className="container mt-4">
        <>
        <input type="text" onChange={handilSearch} placeholder="Search.."
        style={{marginBottom:'25px'}}/>
        </>
        <button style={{marginLeft:'110px'}} onClick={resetData} className="btn btn-warning btn-sm">Fetch Data</button>
        <button style={{marginLeft:'750px'}} onClick={()=>navigate('/admin/addUser')} className="btn btn-success btn-sm" >add User</button>
        
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>NO</th>
              <th>Iamge</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userdata.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td><img src={user.image} style={{width:'40px', height:'40px',borderRadius: '50%' }} alt="" /></td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>Delete</button>
                  <button className="btn btn-info btn-sm" onClick={() => handleEdit(user)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
            </>
         ):(
         <Container className='d-flex justify-content-center'>
            <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
              <h1 className='text-center mb-4'>ADMIN Authentication</h1>
              <p className='text-center mb-4'>
                This is a boilerplate for MERN authentication that stores a JWT in
                an HTTP-Only cookie. It also uses Redux Toolkit and the React
                Bootstrap library
              </p>
              <div className='d-flex'>
                <LinkContainer to='/admin/login'>
                  <Button variant='primary' className='me-3'>
                    Sign In
                  </Button>
                </LinkContainer>
  
              </div>
            </Card>
          </Container>
        )}
          
        
      </div>
    )
  }
  
  export default Hero