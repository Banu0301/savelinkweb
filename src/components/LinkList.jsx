import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { List, ListItem, ListItemText, IconButton, Checkbox, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { saveAs } from 'file-saver';
import { CSVLink } from 'react-csv';

const LinkList = ({ setCurrentLink }) => {
  const [links, setLinks] = useState([]);
  const [selectedLinks, setSelectedLinks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'links'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const linksData = [];
      snapshot.forEach((doc) => {
        linksData.push({ ...doc.data(), id: doc.id });
      });
      setLinks(linksData);
    });

    return () => unsubscribe();
  }, []);

  const handleSelectLink = (link) => {
    setSelectedLinks(prevSelected => {
      if (prevSelected.includes(link)) {
        return prevSelected.filter(item => item !== link);
      } else {
        return [...prevSelected, link];
      }
    });
  };

  const handleDeleteLink = async (linkId) => {
    try {
      await deleteDoc(doc(db, 'links', linkId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const headers = [
    { label: "URL", key: "url" },
    { label: "Category", key: "category" },
    { label: "Tags", key: "tags" }
  ];

  return (
    <div>
      <Button variant="contained" color="primary" disabled={selectedLinks.length === 0}>
        <CSVLink data={selectedLinks} headers={headers} filename={"links.csv"}>Download Selected</CSVLink>
      </Button>
      <List>
        {links.map((link) => (
          <ListItem key={link.id}>
            <Checkbox
              checked={selectedLinks.includes(link)}
              onChange={() => handleSelectLink(link)}
            />
            <ListItemText
              primary={link.url}
              secondary={`Category: ${link.category}, Tags: ${link.tags.join(', ')}`}
            />
            <IconButton edge="end" aria-label="edit" onClick={() => setCurrentLink(link)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteLink(link.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LinkList;
