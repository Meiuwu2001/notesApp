import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  private user: Observable<User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        return user ? this.afs.doc<any>(`users/${user.uid}`).valueChanges() : new Observable<any>();
      })
    );
  }

  // Obtener el perfil del usuario
  getUserProfile(): Observable<any> {
    return this.user;
  }


  // Actualizar el perfil del usuario
  async updateUserProfile(data: { displayName?: string; phoneNumber?: string; photoURL?: string }) {
    const user = await this.afAuth.currentUser;
    if (user) {
      await user.updateProfile(data);
      await this.afs.doc(`users/${user.uid}`).update(data);
    }
  }

  // Subir imagen de perfil// Modificar este método para recibir una URL en lugar de un objeto File
  // Subir imagen de perfil
  uploadProfileImage(imageBlob: Blob): Promise<string> {
    return this.afAuth.currentUser
      .then(user => {
        if (user) {
          const filePath = `profileImages/${user.uid}`;
          const fileRef = this.storage.ref(filePath);

          // Subir la imagen desde el blob
          const task = this.storage.upload(filePath, imageBlob);
          return task.snapshotChanges().toPromise().then(() => fileRef.getDownloadURL().toPromise());
        } else {
          return Promise.reject('No user logged in');
        }
      })
      .catch(error => {
        // Manejar errores aquí si es necesario
        return Promise.reject('Error uploading image: ' + error.message);
      });
  }



}
