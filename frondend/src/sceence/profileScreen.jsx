import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/formContainer";
import { toast } from "react-toastify";
import Loader from "../components/loading";
import { logout, setCredentials } from "../Slices/authSlice";
import { useUpdateUserMutation } from "../Slices/usersApiSlice";

const RegisterScreen = () => {

    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [conformPassword, setConformPassword] = useState('')
    const [image,setImage]=useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [liveImage, setLiveimage] = useState(null)
    
    



    // const navigate=useNavigate()
    const dispatch = useDispatch();


    const { userInfo } = useSelector((state) => state.auth)

    const [updateProfile, { isLoading }] = useUpdateUserMutation()

    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
        setImage(userInfo.image)
        console.log(userInfo);

    }, [userInfo.setEmail, userInfo.setName,userInfo.image]) 

    const HadilSubmit = async (e) => {
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
        if (password || conformPassword) {
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
        }

        if (password !== conformPassword) {
            toast.error('Password do not match')
        } else {
           
           //console.log(selectedFile);

           const postDetails = (pics) => {
            return new Promise((resolve, reject) => {
                if (!pics) {
                    toast.error('Please Select an image!');
                    return reject('No image selected');
                }
        
                if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
                    const data = new FormData();
                    data.append('file', pics);
                    data.append('upload_preset', 'notezipper');
                    data.append('cloud_name', 'dxv6je6qy');
        
                    fetch("https://api.cloudinary.com/v1_1/dxv6je6qy/image/upload", {
                        method: "post",
                        body: data,
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data.url.toString());
                        resolve(data.url.toString());
                    })
                    .catch((err) => {
                        console.error(err);
                        reject(err);
                    });
                } else {
                    toast.error('Please select a valid image.');
                    reject('Invalid image type');
                }
            });
        };
        
        // Assuming selectedFile is the File object from an input element
        if (selectedFile) {
            try {
                const picUrl = await postDetails(selectedFile);
        
                const res = await updateProfile({
                    _id: userInfo._id,   
                    name,
                    email,
                    password,
                    image: picUrl, // Use the picUrl obtained from postDetails
                }).unwrap();
        
                //console.log(res);
                dispatch(setCredentials({ ...res }));
                toast.success('Profile Updated.');
            } catch (err) {
                toast.error(err?.data?.message || err.error || 'An error occurred');
            }
        }else{
            try {
        
                const res = await updateProfile({
                    _id: userInfo._id,   
                    name,
                    email,
                    password,
                }).unwrap();
        
                console.log(res);
                dispatch(setCredentials({ ...res }));
                toast.success('Profile Updated.');
            } catch (err) {
                toast.error(err?.data?.message || err.error || 'An error occurred');
            }
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

    const Addimage=(e)=>{
        const file = e.target.files[0];
        if (file) {

            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
              setLiveimage(reader.result);
            };

            reader.readAsDataURL(file);
           }
        }

    return (
        <FormContainer>
            <h1>Update Profile</h1>

            <div style={{ width: '150px', height: '150px', backgroundColor: "gray", borderRadius: '50%', margin: '50px' }}>
                {liveImage?(
                    
                    <img src={liveImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' , borderRadius: '50%'  }}/>
                ):(
                    <img src={image} alt=""  style={{ width: '100%', height: '100%', objectFit: 'cover' , borderRadius: '50%'  }}       />
                )}

            </div>

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

                <Form.Group className='my-2' controlId="image">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={Addimage}
                    ></Form.Control>
                </Form.Group>


                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3">
                    Update
                </Button>


            </Form>
        </FormContainer>
    )
}

export default RegisterScreen;