import React from 'react';
import { signInWithGoogle } from '../firebase';
import { Button } from '@mui/material';

const Auth = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={signInWithGoogle}
      >
        Sign In with Google
      </Button>
    </div>
  );
};

export default Auth;
