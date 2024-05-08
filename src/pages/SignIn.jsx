import React, { useEffect, useRef } from 'react'
import { Container } from '@mui/material'
import RegisterForm from '../shared/components/RegisterForm'
import GoogleButton from '../shared/components/GoogleButton';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import BackToHome from '../shared/components/BackToHome';
import { firebaseErrorsCodes } from '../shared/constants/Constants';
import CustomizedLoader from '../shared/components/CustomizedLoader';
import { authWithEmailAndPassword, authWithGoogle } from '../requests/RAuthentication';

export default function SignIn() {
  
  const registerFormRef = useRef(null);

  const { user, loading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/layoutnavbar/evenements');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <CustomizedLoader />
    )
  }

  const handleGoogleSignIn = () => {
    try {
      authWithGoogle();
    } catch (error) {
      console.error("Erreur lors de l'authentification avec Google", error);
    }
  }

  const handleSignInWithEmailAndPassword = async () => {
    registerFormRef.current.setisHandlingSubmitValue(true);
    const email = registerFormRef.current.getEmailValue();
    const password = registerFormRef.current.getPasswordValue();
    registerFormRef.current.setHelperTextEmail('');
    registerFormRef.current.setHelperTextPassword('');

    authWithEmailAndPassword(email, password).then((userCredential) => {
      registerFormRef.current.setisHandlingSubmitValue(false);
      navigate('/layoutnavbar/evenements');
    }).catch((error) => {
      console.error("Erreur lors de l'authentification avec email et mot de passe", error);
      registerFormRef.current.setisHandlingSubmitValue(false);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        registerFormRef.current.setHelperTextEmail(firebaseErrorsCodes[error.code]);
        registerFormRef.current.setHelperTextPassword(firebaseErrorsCodes[error.code]);
      }
    })
  }

  return (
    <Container className='pt-4'>
      <div>
        <BackToHome />
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
