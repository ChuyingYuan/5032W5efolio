<template>
    <div class="login-container">
      <h1>Login Page</h1>
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      <p v-if="loginError" class="text-danger">Invalid username or password</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { isAuthenticated } from '../auth';  // Import the global authentication state
  
  const router = useRouter();
  const username = ref('');
  const password = ref('');
  const loginError = ref(false);
  
  // Hardcoded credentials
  const validUsername = 'admin';
  const validPassword = 'password123';
  
  const submitLogin = () => {
    if (username.value === validUsername && password.value === validPassword) {
      isAuthenticated.value = true;
      loginError.value = false;
      // Redirect to the home page or another route after login
      router.push('/about'); // Redirect to the About page or another route after successful login
    } else {
      loginError.value = true;
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
  }
  </style>
  