import React, { useEffect, useRef } from 'react'
import { Container } from '@mui/material'
import RegisterForm from '../shared/components/RegisterForm'
import GoogleButton from '../shared/components/GoogleButton';
import firebase from '../firebase';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import BackToHome from '../shared/components/BackToHome';
import { firebaseErrorsCodes } from '../shared/constants/Constants';

const auth = firebase.auth();

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
    return <Container>
            <div>
              <h1>Veuillez patienter...</h1>
            </div>
          </Container>
  }

  const handleGoogleSignIn = () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
    } catch (error) {
      console.error("Erreur lors de l'authentification avec Google", error);
    }
  }

  const handleSignInWithEmailAndPassword = () => {
    registerFormRef.current.setisHandlingSubmitValue(true);
    const email = registerFormRef.current.getEmailValue();
    const password = registerFormRef.current.getPasswordValue();
    registerFormRef.current.setHelperTextEmail('');
    registerFormRef.current.setHelperTextPassword('');

    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      registerFormRef.current.setisHandlingSubmitValue(false);
      navigate('/layoutnavbar/evenements');
    })
    .catch((error) => {
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
