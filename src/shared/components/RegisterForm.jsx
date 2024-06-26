import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import RegisterButton from './RegisterButton'
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const RegisterForm = forwardRef(({ handleSubmit, register }, ref) => {

    const emailRef = useRef(null);
    const displayNameRef = useRef(null);
    const passwordRef = useRef(null);

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [helperTextEmail, setHelperTextEmail] = useState('');
    const [helperTextPassword, setHelperTextPassword] = useState('');
    const [isHandlingSubmit, setIsHandlingSubmit] = useState(false);

    useImperativeHandle(ref, () => ({
        getEmailValue: () => emailRef.current.value,
        getDisplayNameValue: () => displayNameRef.current.value,
        getPasswordValue: () => passwordRef.current.value,
        setisHandlingSubmitValue: (value) => setIsHandlingSubmit(value),
        clearForm: () => clearForm(),
        setHelperTextEmail: (value) => setHelperTextEmail(value),
        setHelperTextPassword: (value) => setHelperTextPassword(value)
    }));

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    }

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const clearForm = () => {
        setEmail('');
        setPassword('');
        setDisplayName('');
    }

    const thisHandleSubmit = async (e) => {
        e.preventDefault();
        setIsHandlingSubmit(true);
        await handleSubmit();
    }

  return (
    <form onSubmit={thisHandleSubmit}>
        <Grid container spacing={3} className='mt-3'>
            <Grid item xs={12}>
                <div className=''>
                    <TextField
                        required
                        inputRef={emailRef}
                        value={email}
                        onChange={handleEmailChange}
                        error={helperTextEmail !== ''}
                        helperText={helperTextEmail}
                        id="email"
                        name='email'
                        label="email"
                        type="email"
                        variant="outlined"
                        fullWidth
                    />
                </div>
            </Grid>
            <Grid item xs={12} className={`${register ? '' : 'd-none'}`}>
                <div className=''>
                    <TextField
                        required={register}
                        inputRef={displayNameRef}
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        id="displayName"
                        name='displayName'
                        label="nom d'utilisateur"
                        variant="outlined"
                        fullWidth
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className=''>
                    <TextField
                        required
                        inputRef={passwordRef}
                        value={password}
                        onChange={handlePasswordChange}
                        error={helperTextPassword !== ''}
                        helperText={helperTextPassword}
                        id="password"
                        name='password'
                        label="mot de passe"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        autoComplete='off'
                        fullWidth
                        InputProps={{
                            endAdornment : (
                                <InputAdornment position="start">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="start"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                <RegisterButton isHandlingSubmit={isHandlingSubmit}>
                    {register ? "S'inscrire" : "Se connecter"}
                </RegisterButton>
            </Grid>
        </Grid>
    </form>
  )
});

export default RegisterForm
