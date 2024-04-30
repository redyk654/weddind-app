import { Alert, Snackbar } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

const CustomizedSnackbars = forwardRef((props, ref) => {

    const successRef = useRef(null);
    const errorRef = useRef(null);

    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    
    useImperativeHandle(ref, () => ({
        handleSuccess: () => handleSuccess(),
        handleError: () => handleError()
    }));

    const handleSuccess = () => {
        setIsSuccess(true);
    }

    const handleError = () => {
        setIsError(true);
    }

  return (
    <div>
        <Snackbar
            ref={successRef}
            open={isSuccess}
            autoHideDuration={4000}
            onClose={() => setIsSuccess(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={() => setIsSuccess(false)} severity="success" variant='filled'>
                {props.successMessage}
            </Alert>
        </Snackbar>
        <Snackbar
            ref={errorRef}
            open={isError}
            autoHideDuration={4000}
            onClose={() => setIsError(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={() => setIsError(false)} severity="error" variant='filled'>
                {props.errorMessage}
            </Alert>
        </Snackbar>
    </div>
  )
})

export default CustomizedSnackbars;