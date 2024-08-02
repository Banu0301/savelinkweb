import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { TextField, Button } from '@mui/material';

const AddLink = ({ currentLink, handleEditComplete }) => {
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (currentLink) {
      setUrl(currentLink.url);
      setCategory(currentLink.category);
      setTags(currentLink.tags.join(', '));
    }
  }, [currentLink]);

  const handleAddLink = async () => {
    try {
      if (currentLink) {
        const linkRef = doc(db, 'links', currentLink.id);
        await updateDoc(linkRef, {
          url,
          category,
          tags: tags.split(',').map(tag => tag.trim()),
          updatedAt: serverTimestamp()
        });
        handleEditComplete();
      } else {
        await addDoc(collection(db, 'links'), {
          url,
          category,
          tags: tags.split(',').map(tag => tag.trim()),
          createdAt: serverTimestamp()
        });
      }
      setUrl('');
      setCategory('');
      setTags('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <br />
      <br />
      <TextField
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
      />
      <br />
      <br />
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
      />
      <br />
      <br />
      <TextField
        label="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleAddLink}>
        {currentLink ? 'Update Link' : 'Add Link'}
      </Button>
      <br/>
      <br/>
    </div>
 
  );
};

export default AddLink;
