import { useState, useEffect } from "react";
import { auth } from "./firebase";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return unsubscribe;
  }, []);

  return user ? <Chat /> : <Login />;
}

export default App;