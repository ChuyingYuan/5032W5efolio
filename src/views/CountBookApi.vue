<template>
    <pre>{{ jsondata }}</pre>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      jsondata: null,
      error: null,
    };
  },
  methods: {
    async getBookCount() {
      try {
        const response = await axios.get('https://countbooks-obat3mx2dq-uc.a.run.app');
        this.jsondata = response.data;
        this.error = null;
      } catch (error) {
        console.error('Error fetching book count:', error);
        this.error = error;
        this.jsondata = null;
      }
    },
  },
  mounted() {
    this.getBookCount();  // Call the method when the component is mounted
  },
};
</script>
