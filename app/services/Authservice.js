import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebaseconfig/Firebase";

/** ---------- Sign Up ---------- */
export const registerStudent = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "student_details", user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      createdAt: new Date().toISOString(),
    });

    return { success: true, message: "Account created successfully!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const loginStudent = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;

    const docRef = doc(db, "student_details", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, message: "No student data found." };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
