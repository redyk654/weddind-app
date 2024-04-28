import React, { useRef } from 'react'
import { Container } from '@mui/material'
import RegisterForm from '../shared/components/RegisterForm'
import GoogleButton from '../shared/components/GoogleButton';


export default function SignIn() {
  
  const registerFormRef = useRef(null);

  const handleSignInWithEmailAndPassword = () => {
  }

  const handleGoogleSignIn = () => {
  }

  return (
    <Container className='pt-4'>
      <div>
        <h1>Connexion</h1>
      </div>
      <RegisterForm
        handleSubmit={handleSignInWithEmailAndPassword}
        register={false}
        ref={registerFormRef}
      />
      <GoogleButton handleGoogleButtonClick={handleGoogleSignIn}>
        Se connecter avec Google
      </GoogleButton>
    </Container>
  )
}
