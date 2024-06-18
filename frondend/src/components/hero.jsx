import { Button, Card, Container } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'



const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth)

  //console.log(userInfo);
  return (

    <div className=' py-5'>
      {userInfo ? (
        <>
          <Container className='d-flex justify-content-center'>
            <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
              <h1 className='text-center mb-4'>Welcome to Our Platform!</h1>
              <p className='text-center mb-4'>
                Hi <b>{userInfo.name}</b>, welcome aboard! We're thrilled to have you here.
              </p>
              <p className='text-center'>
                Get ready to explore a world of opportunities and connect with like-minded individuals.
              </p>


            </Card>
          </Container>
        </>
      ) : (
        <Container className='d-flex justify-content-center'>
          <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
            <h1 className='text-center mb-4'>MERN Authentication</h1>
            <p className='text-center mb-4'>
              This is a boilerplate for MERN authentication that stores a JWT in
              an HTTP-Only cookie. It also uses Redux Toolkit and the React
              Bootstrap library
            </p>
            <div className='d-flex'>
              <LinkContainer to='/login'>
                <Button variant='primary' className='me-3'>
                  Sign In
                </Button>
              </LinkContainer>

              <LinkContainer to='/register'>
                <Button variant='secondary'>
                  Register
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