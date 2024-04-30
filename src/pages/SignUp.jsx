import { Container } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import firebase from '../firebase';
import 'firebase/auth';
import RegisterForm from '../shared/components/RegisterForm';
import { useNavigate } from 'react-router-dom';
import GoogleButton from '../shared/components/GoogleButton';
import useAuth from '../hooks/useAuth';

const auth = firebase.auth();

export default function SignUp() {

  const registerFormRef = useRef(null);

  const { user, loading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await firebase.auth().getRedirectResult();
        if (result.user) {
          const { displayName, email } = result.user;
          await firebase.firestore().collection('users').doc(result.user.uid).set({
            displayName: displayName,
            email: email
          });
          navigate('/evenements');
        }
        if (user) {
          // Si un utilisateur est déjà connecté, rediriger directement vers la page d'événements
          navigate('/evenements');
          return; // Arrêter l'exécution de la fonction
        }
      } catch (error) {
        console.error(error);
      }
    };

    handleRedirect();
  }, [user, navigate]);

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

  if (loading) {
    return (
      <Container>
        <div>
          <h1>Veuillez patienter...</h1>
        </div>
      </Container>
    )
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
