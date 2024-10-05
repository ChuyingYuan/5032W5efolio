<template>
  <div class="main-container">
    <header v-if="showHeader">
      <BHeader />
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import BHeader from './components/BHeader.vue';
import CountBookApi from './views/CountBookApi.vue';
import GetBookApi from './views/GetBookApi.vue';

export default {
  name: 'App',
  components: {
    BHeader,
    CountBookApi,
    GetBookApi
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'CountBookApi';
    }
  }
};
</script>
