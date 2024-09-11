import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { CountdownComponent } from '../components/countdown/countdown.component';

@NgModule({
  declarations: [CountdownComponent],
  imports: [CommonModule, LayoutRoutingModule],
  exports: [CountdownComponent]

})
export class LayoutModule {}
