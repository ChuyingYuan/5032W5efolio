<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { fetchUserRole } from "../auth"; // Import the function correctly

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Firebase SignIn Successful!");
      router.push("/"); // Redirect to homepage after successful sign-in
      console.log(auth.currentUser); // To check the current user signed in

      // Use the fetchUserRole function correctly
      fetchUserRole(auth.currentUser.uid).then((role) => {
        console.log("User role:", role);
      }).catch((error) => {
        console.log("Error fetching user role:", error);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
