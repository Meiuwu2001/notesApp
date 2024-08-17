import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotesComponent } from './components/notes/notes.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, LoginComponent, NotesComponent, ProfileEditComponent, ChangePasswordComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp(
    { "projectId": "notesapp-11cc8", "appId": "1:204163054268:web:3abe9a2d048bddbc8e6eb9", "databaseURL": "https://notesapp-11cc8-default-rtdb.firebaseio.com", "storageBucket": "notesapp-11cc8.appspot.com", "apiKey": "AIzaSyBBR3OKFIQzjxkLa3t3FInPXrda5B4Y70U", "authDomain": "notesapp-11cc8.firebaseapp.com", "messagingSenderId": "204163054268", "measurementId": "G-XP482LDDZ9" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule { }
