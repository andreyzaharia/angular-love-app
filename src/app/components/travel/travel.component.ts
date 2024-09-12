import { Component, OnInit } from '@angular/core';
import { Imagen } from '../../interfaces/images.interface';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'components-travel',
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.css',
})
export class TravelComponent implements OnInit {
  imagenes: Imagen[] = []; // Propiedad para almacenar las imágenes
  constructor(private storageService: StorageService) {}
  ngOnInit(): void {
    this.cargarImagenes(); // Llamar al método para cargar las imágenes
  }

  cargarImagenes(): void {
    // Llamar al servicio para obtener la lista de imágenes
    this.storageService.getImagenes().subscribe(data => {
      this.imagenes = data;
    });
  }
}
