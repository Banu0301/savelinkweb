import React from 'react';
import { Button } from '@mui/material';


import LinkList from './LinkList';
import AddLink from './AddLink';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';



const Home = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div>
      <h1>Welcome to Smart Link Organizer</h1>
      <Button variant="contained" color="primary" onClick={handleSignOut}>
        Sign Out
      </Button>
      <AddLink />
      <LinkList />
    </div>
  );
};

export default Home;
