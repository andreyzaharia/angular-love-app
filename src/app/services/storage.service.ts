import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Imagen } from '../interfaces/images.interface';
import { forkJoin, from, Observable } from 'rxjs';
import { concatMap, finalize, map, switchMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  getImagenes(): Observable<Imagen[]> {
    return this.firestore
      .collection<Imagen>('travel')
      .valueChanges()
      .pipe(
        switchMap((imagenes) => {
          return from(
            Promise.all(
              imagenes.map(async (imagen) => {
                const url = await this.storage
                  .ref(imagen.url)
                  .getDownloadURL()
                  .toPromise();
                return { ...imagen, url };
              })
            )
          );
        })
      );
  }

  uploadFile(file: File, nombre: string, descripcion: string) {
    const filePath = `images/${file.name}`;
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            // Guardar la URL y los detalles en Firestore
            this.firestore.collection('travel').add({
              nombre: nombre,
              url: filePath,
              descripcion: descripcion,
            });
          });
        })
      )
      .subscribe();
  }
}
