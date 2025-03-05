<template>
  <Transition name="fade">
    <div class="fixed inset-0 flex items-center justify-center bg-gray-200/20 backdrop-opacity-40 z-[9999]">
      <img :src="'DRPLogo.png'" alt="Loading..." class="w-24 h-24 scale-animation" />
    </div>
  </Transition>
</template>

<script setup>

</script>

<style>
@keyframes scaleAnimation {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}

.scale-animation {
  animation: scaleAnimation 1s infinite ease-in-out;
}

/* Smooth fade in/out transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>