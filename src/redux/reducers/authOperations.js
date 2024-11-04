import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../config";

export const registerDB = createAsyncThunk(
  "auth/signup",
  async ({ inputEmail, inputPassword, inputLogin, profilePhoto }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, inputEmail, inputPassword);

      const profileImg = await fetch(profilePhoto);
      const bytes = await profileImg.blob();
      const createdUrl = `profiles/${Date.now()}`;
      const profileImageRef = ref(storage, createdUrl);
      await uploadBytes(profileImageRef, bytes);
      const profileImageUrl = await getDownloadURL(profileImageRef);

      await updateProfile(auth.currentUser, {
        displayName: inputLogin,
        photoURL: profileImageUrl,
      });

      const { email, displayName, photoURL, uid } = auth.currentUser;

      await setDoc(doc(db, "users", uid), {
        email: email,
        displayName: displayName,
        userId: uid,
        photoURL: photoURL,
      });

      return { email, displayName, userId: uid, photoURL };
    } catch (error) {
      console.error("SIGNUP ERROR:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginDB = createAsyncThunk(
  "auth/login",
  async ({ inputEmail, inputPassword }, thunkAPI) => {
    try {
      await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
      const { uid } = auth.currentUser;

      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          email: userData.email,
          displayName: userData.displayName,
          userId: userData.userId,
          photoURL: userData.photoURL,
        };
      } else {
        throw new Error("User data not found in Firestore.");
      }
    } catch (error) {
      console.log("SIGNIN ERROR:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutDB = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return {};
  } catch (error) {
    console.log(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});
