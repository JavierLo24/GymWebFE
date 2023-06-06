import { ISidebar } from "src/app/data/interfaces/ISidebar.interface";

export const sidebarItems: ISidebar[]  = [
  {
      title: 'Clientes',
      icon: 'pi pi-home',
      link: ['/admin/home']
  },
  {
      title: 'Rutinas',
      icon: 'pi pi-file',
      link: ['/admin/rutinas']
  },
  {
      title: 'Ejercicios',
      icon: 'pi pi-heart-fill',
      link: ['/admin/ejercicios']
  },
  {
      title: 'Planes',
      icon: 'pi pi-calendar',
      link: ['/admin/planes']
  },
  {
      title: 'Entrenadores',
      icon: 'pi pi-users',
      link: ['/admin/entrenadores']
  },



]
