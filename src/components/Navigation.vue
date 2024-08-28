<template>
    <nav class="navbar">
      <button v-if="isAuthenticated" @click="logout">Logout</button>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { isAuthenticated } from '../auth'; 
  const router = useRouter();
  
  const logout = () => {
    isAuthenticated.value = false;
    router.push('/login'); 
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    gap: 10px;
    justify-content: center; 
  }
  </style>
  