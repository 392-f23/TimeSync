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
  signInWithPopup,
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
const scope = "https://www.googleapis.com/auth/calendar.readonly";

export const initGoogleApi = () => {
  gapi.load("client:auth2", () => {
    gapi.client
      .init({
        apiKey: apiKey,
        clientId: clientId,
        discoveryDocs: discoveryDocs,
        scope: scope,
      })
      .then(() => {
        console.log("Google API Initialized");
      });
  });
};

export const listUpcomingEvents = async () => {
  try {
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
  apiKey: "AIzaSyBGLIpFsoLHyfRsqxW-f8dfUKa4bQV03NQ",
  authDomain: "skillswap-5f85d.firebaseapp.com",
  projectId: "skillswap-5f85d",
  storageBucket: "skillswap-5f85d.appspot.com",
  messagingSenderId: "689531219521",
  appId: "1:689531219521:web:09d21a680cfc62620860c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
  signInWithPopup(getAuth(app), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(app));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(app), setUser), []);

  return [user];
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
