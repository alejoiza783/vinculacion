import { useState, useEffect, useRef } from "react";
import { auth, messagesRef, timestamp } from "../firebase";
import { addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { Avatar, Box, TextField, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(messagesRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: timestamp(),
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
    });

    setNewMessage("");
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Paper sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        <List>
          {messages.map((msg) => (
            <ListItem key={msg.id}>
              <ListItemAvatar>
                <Avatar src={msg.photoURL} alt={msg.displayName} />
              </ListItemAvatar>
              <ListItemText
                primary={msg.displayName}
                secondary={msg.text}
                secondaryTypographyProps={{ color: "text.primary" }}
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>
      <Box component="form" onSubmit={sendMessage} sx={{ p: 2, display: "flex" }}>
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <IconButton type="submit" color="primary">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;