import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { TextField, Button } from '@mui/material';

const FolderManager = ({ folder, onClose }) => {
  const [newFolderName, setNewFolderName] = useState(folder);

  const handleSaveFolder = async () => {
    try {
      // Update all links in the current folder to the new folder name
      const linksQuery = query(collection(db, 'links'), where('folder', '==', folder));
      const querySnapshot = await getDocs(linksQuery);
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { folder: newFolderName });
      });
      onClose();
    } catch (error) {
      console.error("Error updating folder name: ", error);
    }
  };

  return (
    <div className="folder-manager-form">
      <TextField
        label="Folder Name"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSaveFolder}>
        Save Folder
      </Button>
      <Button variant="contained" color="secondary" onClick={onClose}>
        Cancel
      </Button>
    </div>
  );
};

export default FolderManager;
