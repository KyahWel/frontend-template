import { useRoute } from 'vue-router';

export const useSidebar = () => {
  const route = useRoute();
  const appConfig = useAppConfig(); // Access theme colors

  const menuItems = [
    {
      label: 'USER MANAGEMENT',
      icon: 'pi pi-chevron-down',
      items: [
        { label: 'Users', icon: 'pi pi-folder', path: '/app/users' },
        { label: 'Modules', icon: 'pi pi-chart-bar', path: '/app/modules' },
        { label: 'Roles', icon: 'pi pi-cog', path: '/app/roles' },
      ],
    },
  ];

  const user = {
    name: 'Amy Elsner',
    avatar: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
  };

  const isActivePage = (path: string): boolean => {
    return path === route.path;
  };

  return { menuItems, user, isActivePage, appConfig };
};
