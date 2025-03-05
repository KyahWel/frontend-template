<template>
  <ClientOnly>
      <div>
          <NuxtLoadingIndicator :height="4"/>
          <div class="p-grid" style="min-height: 100vh;">
              <!-- Sidebar -->
              <div :class="['p-col-fixed', collapsed ? 'p-d-none' : 'p-d-block']" style="width: 200px;">
                  <Header :collapsed="collapsed"/>
                  <SidebarMenu  :loading="pending"/>
              </div>
              
              <!-- Main Content -->
              <div class="p-col">
                  <AppMainTopHeader @collapsed="triggerCollapsed"/>
                  <div class="p-p-3 dotted-background">
                      <div class="p-d-flex p-jc-center">
                          <div class="container p-col-12">
                              <slot/>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </ClientOnly>
</template>

<script setup>
import { ref } from 'vue';
import SidebarMenu from '~/components/SidebarMenu.vue';
const collapsed = ref(false);
const triggerCollapsed = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style scoped>
.dotted-background {
  background: radial-gradient(circle, rgba(238,238,238,1) 0%, rgba(255,255,255,1) 100%);
}
</style>