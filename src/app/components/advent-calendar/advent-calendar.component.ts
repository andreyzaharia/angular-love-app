import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ImageCustom, LoveCard } from '../../interfaces/card.interface';
import moment, { Moment } from 'moment';
import { titles, contents, imgs } from '../../messages/messages';  // Ajusta la ruta según la ubicación del archivo

@Component({
  selector: 'components-advent-calendar',
  templateUrl: './advent-calendar.component.html',
  styleUrl: './advent-calendar.component.css',
})
export class AdventCalendarComponent implements OnInit {
  public cards: LoveCard[] = [];



  constructor(private messageService: MessageService) {
    moment.locale('es');
  }

  ngOnInit(): void {
    this.initDays();
  }

  initDays() {
    // Crear la fecha 14 de septiembre (año 2024 como ejemplo)
    let fecha = moment('2024-09-14', 'YYYY-MM-DD');

    for (let i = 0; i < 8; i++) {
      // Sumar 'i' días a la fecha de inicio para obtener la fecha correspondiente
      let fechaActual = moment(fecha).add(i, 'days');
      // Calcular cuántos días faltan hasta esa fecha
      const remainingDays = fechaActual.diff(moment(), 'days'); // Diferencia en días desde hoy
      const remainingHours = fechaActual.diff(moment(), 'hours') % 24; // Diferencia en horas, solo las horas sobrantes

      this.cards.push;
      const newCard: LoveCard = {
        img: { url: imgs[i].url, alt: imgs[i].alt },
        blocked: true,
        date: fechaActual.format('YYYY-MM-DD'),
        day: remainingDays,
        hours: remainingHours,
        remainingTime: this.calculateRemainingTime(fechaActual),
        title: '',
        content: '',
      };

      this.cards.push(newCard);
    }

    // Iniciar la actualización en tiempo real del contador
    setInterval(() => {
      this.updateRemainingTimes();
    }, 1000); // Actualización cada 1000 ms (1 segundo)
  }

  updateRemainingTimes() {
    this.cards.forEach((card) => {
      const targetDate = moment(card.date); // Convertir la fecha de la card a un objeto moment
      card.remainingTime = this.calculateRemainingTime(targetDate);
    });
  }

  calculateRemainingTime(targetDate: Moment): string {
    const now = moment(); // Fecha y hora actual
    const timeDifference = targetDate.diff(now); // Diferencia entre la fecha objetivo y ahora

    // Si la fecha ya ha pasado o es hoy
    if (timeDifference <= 0) {
      return '¡El día ha llegado!';
    }

    // Calcular la duración en días, horas, minutos y segundos
    const duration = moment.duration(timeDifference);
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    // Devolver el formato deseado
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  unlockDay(cardIndex: number): void {
    // Verificar que el índice sea válido
    if (cardIndex < 0 || cardIndex >= this.cards.length) {
      console.error('Índice de tarjeta inválido.');
      return;
    }

    const card = this.cards[cardIndex];
    const { day, hours } = card;
    console.log({
      remainingDays: day,
      remainingHour: hours,
    });

    const messageError = 'Todavia no puedes, ten paciencia!';
    const messageSuccess =
      'Feliz aniversario mi vida, este es tu regalo de hoy';

    // Si quedan días o si es el mismo día pero aún quedan horas, muestra el mensaje de advertencia
    if (day > 0 || (day === 0 && hours > 0)) {
      this.show(messageError, 'warn', '¡Quietaa!');
      return;
    }

    card.blocked = false;
    card.title = titles[cardIndex] || '¡Día Especial!';  // Título basado en el índice
    card.content = contents[cardIndex] || '¡Aquí tienes una sorpresa especial para ti!';  // Contenido basado en el índice
    this.show(messageSuccess, 'success', 'Felicidadess!!');
  }

  show(message: string, severity: string, summary: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: message,
    });
  }
}
