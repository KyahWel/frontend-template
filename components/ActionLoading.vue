<template>
  
    <!-- Background dimming overlay -->
    <div class="absolute inset-0 bg-black opacity-60"></div>
  
    <!-- Content (loading spinner and text) -->
    <div class="relative loading-container">
      <div class="loading-spinner"></div>
      <p>LOADING...</p>
    </div>

</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

let prop = defineProps(['type'])
onMounted(() => {
  
})
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 8px solid rgba(255, 255, 255, 0.1);
  border-top: 8px solid #007bff; /* Blue */
  animation: spin 1s linear infinite;
}

p {
  font-size: 1.5rem;
  margin-top: 15px;
  letter-spacing: 0.15rem;
  color: #fff; /* White text */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
