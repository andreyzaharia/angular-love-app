import { Component } from '@angular/core';

@Component({
  selector: 'components-countdown',
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css',
})
export class CountdownComponent {
  public currentDate: string;
  public daysRemaining: number;
  public message: string;

  private anniversaryDate: Date = new Date('2024-09-19'); // Cambia esta fecha a la fecha de tu aniversario
  constructor() {
    this.currentDate = this.getCurrentDate();
    this.daysRemaining = this.calculateDaysRemaining();
    this.message = this.getMessage();
  }

  getCurrentDate(): string {
    const today = new Date();
    return this.formatDate(today);
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  calculateDaysRemaining(): number {
    const today = new Date();
    const timeDiff = this.anniversaryDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  getMessage(): string {
    const today = new Date();
    if (this.isAnniversary(today)) {
      return '¡Es hoyyyy gracias por estar conmigo! Te amooo';
    } else if (this.daysRemaining > 0) {
      return `Hoy es ${this.currentDate} y solo quedan ${this.daysRemaining} días para nuestro aniversario.`;
    } else {
      return '¡Nuestro aniversario ya pasó! Pero nos quedan unos dias por disfrutar juntos';
    }
  }

  isAnniversary(date: Date): boolean {
    return date.toDateString() === this.anniversaryDate.toDateString();
  }
}
