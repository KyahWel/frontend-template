<template>
  <div class="overflow-y-auto">
    <ul class="list-none p-3">
      <li v-for="(menu, index) in menuItems" :key="index">
        <div
          v-ripple
          v-styleclass="{
            selector: '@next',
            enterClass: 'hidden',
            enterActiveClass: 'slidedown',
            leaveToClass: 'hidden',
            leaveActiveClass: 'slideup',
          }"
          class="p-3 flex align-items-center justify-content-between text-600 text-lg cursor-pointer p-ripple"
        >
          <span class="font-medium">{{ menu.label }}</span>
          <i class="pi pi-chevron-down"></i>
        </div>
        <ul class="list-none p-0 m-0 overflow-hidden">
          <li v-for="(item, i) in menu.items" :key="i">
            <router-link v-slot="{ navigate }" :to="item.path" custom>
              <div
                v-ripple
                @click="navigate"
                class="flex align-items-center cursor-pointer p-3 text-lg border-round transition-duration-150 transition-colors p-ripple"
                :class="{ 'active-menu': isActivePage(item.path) }"
                :style="activeStyle(item.path)"
              >
                <i :class="[item.icon, 'mr-2']"></i>
                <span class="font-medium">{{ item.label }}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="mt-auto">
    <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
    <a v-ripple class="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
      <Avatar :image="user.avatar" shape="circle" />
      <span class="font-bold">{{ user.name }}</span>
    </a>
  </div>
</template>

<script setup>
import { useSidebar } from '@/composables/useSidebar';

const { menuItems, user, isActivePage, appConfig } = useSidebar();

// Dynamic styles for active menu items
const activeStyle = (path) => {
  return isActivePage(path)
    ? {
        backgroundColor: appConfig.theme.token.colorPrimaryActive, // Background color from config
        color: appConfig.theme.token.colorPrimaryBg, // Text color from config
      }
    : {};
};
</script>
