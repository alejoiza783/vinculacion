import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={signInWithGoogle}
      >
        Iniciar sesión con Google
      </Button>
    </div>
  );
};

export default Login;