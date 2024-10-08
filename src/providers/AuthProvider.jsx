import { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  FacebookAuthProvider,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const facebookAuthProvider = new FacebookAuthProvider();

  const handleFacebookSignUp = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, facebookAuthProvider);
    return result;
  };

  // handle sin up create user withe email and password
  const handleSinup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // handle sin in withe email and password
  const handleLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // handle logout
  const handleLogout = () => {
    setLoading(true);
    signOut(auth);
  };

  // handle update user display name and user photo url
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // handle sing in withe google
  const handleGoogleSinin = async () => {
    return signInWithPopup(auth, provider);
  };

  // set current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedUser) => {
      setUser(loggedUser);
      setLoading(false);
      if (loggedUser) {
        try {
          const { uid, email, displayName } = loggedUser;
          const response = await axios.post(
            "http://localhost:3000/api/v1/genaretToken",
            {
              user: {
                id: uid,
                username: displayName || "",
                email: email || "",
              },
            }
          );
          console.log(response.data);
          if (response.data.success === true) {
            localStorage.setItem("token", response.data.data);
          }
        } catch (error) {
          console.error(
            "Error generating token:",
            error.response ? error.response.data : error.message
          );
        }
      } else {
        localStorage.removeItem("token");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // send auth details as a object for provider value
  const authInfo = {
    handleFacebookSignUp,
    handleSinup,
    handleLogin,
    handleLogout,
    handleGoogleSinin,
    updateUserProfile,
    setLoading,
    loading,
    user,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
