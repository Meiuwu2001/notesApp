import { Injectable } from '@angular/core';
import {
  Auth, createUserWithEmailAndPassword,
  GoogleAuthProvider, signInWithEmailAndPassword,
  signInWithPopup, signOut, updateProfile
} from '@angular/fire/auth';
import { getAuth, updatePassword as updateFirebasePassword } from 'firebase/auth'; // Importa getAuth y updatePassword de firebase/auth

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  register({ email, password }: { email: string, password: string }) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: { email: string, password: string }) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

  async updatePassword(newPassword: string) {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await updateFirebasePassword(user, newPassword);
        console.log('Password updated successfully');
      } catch (error) {
        console.error('Error updating password', error);
      }
    } else {
      console.error('No user is currently logged in');
    }
  }

  async updateProfile(displayName: string, photoURL: string) {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, { displayName, photoURL });
        console.log('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile', error);
      }
    } else {
      console.error('No user is currently logged in');
    }
  }
}
