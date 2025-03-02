<template>
  <div>
    <ThemeSwitcher />
    <Menubar>
    <template #start>
      <div class="hidden md:block">
        <div class="flex flex-row flex-wrap">
          <div class="w-15rem flex align-items-center flex-wrap">
            <Image src="DRPLogo.png" alt="Image" width="150" />
          </div>

          <div class="">
            <Button icon="pi pi-bars" severity="secondary" aria-label="Bookmark" text @click="menuMain = !menuMain" />
          </div>
        </div>
      </div>

      <div class="block md:hidden">
        <div class="grid">
          <div class="col-fixed" style="width: 35px">
            <Button icon="pi pi-bars" severity="secondary" aria-label="Bookmark" text @click="menuMainMobile = !menuMainMobile" />
          </div>

          <div class="col flex align-items-center justify-content-center">
            <Image src="DRPLogo.png" alt="Image" width="150" />
          </div>
        </div>
      </div>
    </template>
    <template #end>
      <div class="flex align-items-center gap-2">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" @click="toggleMenuProfile" aria-haspopup="true" aria-controls="overlay_menu" />
        <Menu ref="menuProfile" id="overlay_menu" :model="menuProfileItems" :popup="true">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
          </template>
        </Menu>
      </div>
    </template>
  </Menubar>
  </div>
</template>

<script setup>
const menuProfile = ref();
const menuMain = ref(false);
const menuMainMobile = ref(false);

const menuProfileItems = ref([
  {
    label: "Profile",
    items: [
      {
        label: "Configuration",
        icon: "pi pi-cog",
        route: "/settings",
      },
      {
        label: "Sign Out",
        icon: "pi pi-sign-out",
        route: "/logout",
      },
    ],
  },
]);

</script>

<style>

</style>