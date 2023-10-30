import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { gapi } from "gapi-script";

const clientId =
  "1072499886980-uo8ki98ejurcghbu2qbh2ssi33pbpe21.apps.googleusercontent.com";
const apiKey = "AIzaSyDqymZUBgjeXJ1tOAan3YK6rI2uKu4Hu2M";
const discoveryDocs = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const scope = "https://www.googleapis.com/auth/calendar";

export const initGoogleApi = () => {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: apiKey,
        clientId: clientId,
        discoveryDocs: discoveryDocs,
        scope: scope,
      })
      .then(() => {
        console.log("Google API Initialized");
        resolve();
      })
      .catch((error) => {
        console.error("Error initializing Google API", error);
        reject(error);
      });
    });
  });
};


export const listUpcomingEvents = async () => {
  try {
    const authInstance = gapi.auth2.getAuthInstance();
    if (!authInstance) {
      console.error("Google Auth instance is not available");
      return [];
    }

    if (!authInstance.isSignedIn.get()) {
      console.error("User is not signed in");
      return [];
    }

    const currentUser = authInstance.currentUser.get();
    const basicProfile = currentUser.getBasicProfile();
    if (!basicProfile) {
      console.error("Basic profile of the user is not available");
      return [];
    }

    console.log("Authenticated user's email: ", basicProfile.getEmail());

    const response = await gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime",
    });
    return response.result.items;
  } catch (error) {
    console.error("Error fetching events", error);
    return [];
  }
};




// export const gapi   ?

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmX_Jh1LDKNSksQES68l166fPT-Bobtm4",
  authDomain: "timesync-b19f9.firebaseapp.com",
  projectId: "timesync-b19f9",
  storageBucket: "timesync-b19f9.appspot.com",
  messagingSenderId: "721117239762",
  appId: "1:721117239762:web:9edb4a8924ec343cff500b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//  Steven: exporting db here to use in App.jsx
//  IDK the general convention so feel free to move it around
export const db = getFirestore(app);

export const storage = getStorage(app);

export const getDownloadURL = async (storageRef) => {
  try {
    const url = await storageRef.getDownloadURL();
    return url;
  } catch (error) {
    console.error("Error getting the download URL: ", error);
    return null;
  }
};

export const signInWithGoogle = () => {
  console.log("Trying to sign in with Google");
  const authInstance = gapi.auth2.getAuthInstance();
  authInstance.signIn().then(async (googleUser) => {
    console.log("Google user signed in:", googleUser);
    const idToken = googleUser.getAuthResponse().id_token;
    const credential = GoogleAuthProvider.credential(idToken);
    try {
      const userCredential = await signInWithCredential(getAuth(app), credential);
      console.log("Firebase user signed in:", userCredential.user);
    } catch (error) {
      console.error("Error signing in with credential:", error);
    }
  }).catch(error => {
    console.error("Error during Google Sign-In:", error);
  });
};




const firebaseSignOut = () => signOut(getAuth(app));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      setUser(user);
      if (user) {
        console.log("User is signed in", user);
      } else {
        console.log("User is not signed in");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return [user];
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
  } else {
    console.log("User is not signed in");
  }
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
