// composables/useSidebar.ts
import { ref } from 'vue';

export function useSidebar() {
  const menuItems = ref([
    {
      label: 'USER MANAGEMENT',
      icon: 'pi pi-chevron-down',
      items: [
        { label: 'Users', icon: 'pi pi-folder' },
        { label: 'Performance', icon: 'pi pi-chart-bar' },
        { label: 'Settings', icon: 'pi pi-cog' },
      ],
    },
    {
      label: 'APPLICATION',
      icon: 'pi pi-chevron-down',
      items: [
        { label: 'Projects', icon: 'pi pi-folder' },
        { label: 'Performance', icon: 'pi pi-chart-bar' },
        { label: 'Settings', icon: 'pi pi-cog' },
      ],
    },
  ]);

  const user = ref({
    name: 'Amy Elsner',
    avatar: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
  });

  return { menuItems, user };
}
