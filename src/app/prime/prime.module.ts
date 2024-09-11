import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'; // Importa el módulo de botón de PrimeNG
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    CardModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    MessagesModule,
  ],
  exports: [
    MenubarModule,
    CardModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    MessagesModule,
  ],
  providers: [MessageService],
})
export class PrimeModule {}
