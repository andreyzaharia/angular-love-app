import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { RouletteComponentComponent } from './roulette-component/roulette-component.component';
import { TravelComponentComponent } from './travel-component/travel-component.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponentComponent,
  },
  {
    path: 'roulette',
    component: RouletteComponentComponent,
  },
  {
    path: 'travels',
    component: TravelComponentComponent,
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
