<template>
  <nav class="navbar">
    <!-- Only show the logout button if the user is authenticated -->
    <button v-if="isAuthenticated" @click="logout">Logout</button>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { fetchUserRole } from '../auth'; // Import fetchUserRole from your auth file

const auth = getAuth(); // Initialize Firebase authentication
const router = useRouter();
const isAuthenticated = ref(false); // Initialize as false

// Listen to authentication state changes
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true; // User is authenticated
    } else {
      isAuthenticated.value = false; // User is not authenticated
    }
    console.log('isAuthenticated:', isAuthenticated.value);
  });
});

const logout = async () => {
  const user = auth.currentUser; // Get the current user
  if (user) {
    try {
      // Fetch user role before logging out
      const role = await fetchUserRole(user.uid);

      // Display user information and role in the console
      console.log("User Info:");
      console.log("User ID:", user.uid);
      console.log("User Email:", user.email);
      console.log("User Role:", role);

      // Perform the sign-out
      await signOut(auth);
      isAuthenticated.value = false;

      // Redirect to the login page
      router.push('/FireLogin');
      console.log("User has been logged out.");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  } else {
    console.log("No user is currently logged in.");
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
