import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Home from './components/Home';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AddLink from './components/AddLink';
import LinkList from './components/LinkList';

function App() {
  const [user, setUser] = React.useState(null);
  const [currentLink, setCurrentLink] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditComplete = () => {
    setCurrentLink(null);
  };

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Auth />} />
      <Route path="/home" element={user ? (
        <>
          <LinkList setCurrentLink={setCurrentLink} />
          <AddLink currentLink={currentLink} handleEditComplete={handleEditComplete} />
        </>
      ) : <Auth />} />
    </Routes>
  );
}

export default App;
