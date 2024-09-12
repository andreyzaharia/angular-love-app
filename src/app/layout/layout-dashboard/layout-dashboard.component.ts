import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout-dashboard',
  templateUrl: './layout-dashboard.component.html',
  styleUrl: './layout-dashboard.component.css',
})
export class LayoutDashboardComponent {
  public items: MenuItem[] | undefined = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/home',
    },
    {
      label: 'Privado',
      icon: 'pi pi-ban',
      items: [
        {
          label: 'Ruleta picante',
          icon: 'pi pi-sync',
          routerLink: '/roulette'
        },
      ],
    },
    {
      label: 'Viajesito',
      icon: 'pi pi-briefcase',
      items: [
        {
          label: 'Canarias',
          icon: 'pi pi-images',
          routerLink: '/travels'
        },
      ],
    },
  ];
}
