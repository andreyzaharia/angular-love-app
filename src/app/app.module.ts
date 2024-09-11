import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeModule } from './prime/prime.module';
import { LayoutDashboardComponent } from './layout/layout-dashboard/layout-dashboard.component';
import { HomeComponentComponent } from './layout/home-component/home-component.component';
import { RouletteComponentComponent } from './layout/roulette-component/roulette-component.component';
import { LayoutModule } from './layout/layout.module';
import { AdventCalendarComponent } from './components/advent-calendar/advent-calendar.component';
import { RouletteComponent } from './components/roulette/roulette.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayoutDashboardComponent,
    HomeComponentComponent,
    RouletteComponentComponent,
    AdventCalendarComponent,
    RouletteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeModule,
    LayoutModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
