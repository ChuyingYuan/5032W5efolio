// src/auth.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { auth, db } from './firebase'; // Import initialized instances
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore methods

const router = useRouter();

// Function to handle sign-in with email and password
export const signin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Fetch user role (assumes you have a function that retrieves the role from your database)
      fetchUserRole(user.uid).then((role) => {
        // Redirect based on user role
        if (role === "admin") {
          router.push("/admin_dashboard");
        } else if (role === "user") {
          router.push("/user_dashboard");
        }
      });
    })
    .catch((error) => {
      console.error("Error signing in: ", error);
    });
};

// Function to fetch user role from Firestore
export async function fetchUserRole(userId) {
  const roleRef = doc(db, "user", userId); // Use the correct Firestore document reference
  const docSnap = await getDoc(roleRef); // Fetch the document snapshot

  if (docSnap.exists()) {
    return docSnap.data().role;  // Assuming the role field is stored in the user document
  } else {
    throw new Error("No such user!");
  }
}

export const isAuthenticated = () => {
  const user = auth.currentUser;
  return !!user; // Returns true if user exists, otherwise false
};
