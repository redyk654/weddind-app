import React, { useEffect, useRef } from 'react'
import { Container } from '@mui/material'
import RegisterForm from '../shared/components/RegisterForm'
import GoogleButton from '../shared/components/GoogleButton';
import firebase from '../firebase';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const auth = firebase.auth();

export default function SignIn() {
  
  const registerFormRef = useRef(null);

  const { user, loading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/evenements');
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
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
  }

  const handleSignInWithEmailAndPassword = () => {
    const email = registerFormRef.current.getEmailValue();
    const password = registerFormRef.current.getPasswordValue();

    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Utilisateur connecté', user);
    })
    .catch((error) => {
      console.error('Erreur lors de la connexion', error);
    })
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
