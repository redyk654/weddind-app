import { Container } from '@mui/material'
import React, { useRef } from 'react'
import firebase from '../firebase';
import 'firebase/auth';
import RegisterForm from '../shared/components/RegisterForm';
import { useNavigate } from 'react-router-dom';
import GoogleButton from '../shared/components/GoogleButton';

const auth = firebase.auth();

export default function SignUp() {

  const registerFormRef = useRef(null);

  const navigate = useNavigate();

  const handleGoogleSignUp = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  const handleSignUpWithEmailAndPassword = () => {
    const email = registerFormRef.current.getEmailValue();
    const displayName = registerFormRef.current.getDisplayNameValue();
    const password = registerFormRef.current.getPasswordValue();
    
    auth.createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      try {
        await user.updateProfile({
          displayName: displayName
        });
        await firebase.firestore().collection('users').doc(user.uid).set({
          displayName: displayName,
          email: email
        });
        
        navigate('/evenements')
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });

  }

  return (
    <Container className='pt-4'>
      <div>
        <h1>Inscription</h1>
      </div>
      <RegisterForm 
        handleSubmit={handleSignUpWithEmailAndPassword}
        register={true}
        ref={registerFormRef}
      />
      <GoogleButton handleGoogleButtonClick={handleGoogleSignUp}>
        S'inscrire avec Google
      </GoogleButton>
    </Container>
  )
}
