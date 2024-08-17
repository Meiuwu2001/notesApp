import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { NotesComponent } from '../components/notes/notes.component';
import { ProfileEditComponent } from '../components/profile-edit/profile-edit.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'notas',
        component: NotesComponent,
      },
      {
        path: 'perfil',
        component: ProfileEditComponent,
      },
      {
        path: '',
        redirectTo: 'notas',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
