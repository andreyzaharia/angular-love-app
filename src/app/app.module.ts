import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environments';
import { AppRoutingModule } from './app-routing.module';
import { PrimeModule } from './prime/prime.module';

import { AppComponent } from './app.component';
import { LayoutDashboardComponent } from './layout/layout-dashboard/layout-dashboard.component';
import { HomeComponentComponent } from './layout/home-component/home-component.component';
import { RouletteComponentComponent } from './layout/roulette-component/roulette-component.component';
import { LayoutModule } from './layout/layout.module';
import { AdventCalendarComponent } from './components/advent-calendar/advent-calendar.component';
import { RouletteComponent } from './components/roulette/roulette.component';
import { TravelComponent } from './components/travel/travel.component';
import { TravelComponentComponent } from './layout/travel-component/travel-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    RouletteComponentComponent,
    RouletteComponent,
    LayoutDashboardComponent,
    AdventCalendarComponent,
    TravelComponentComponent,
    TravelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeModule,
    LayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // Importa Firestore
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
