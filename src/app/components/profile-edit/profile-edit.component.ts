import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      displayName: [''],
      photoURL: ['']
    });
  }

  async onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    const { newPassword, displayName, photoURL } = this.profileForm.value;

    try {
      await this.authService.updatePassword(newPassword);
      await this.authService.updateProfile(displayName, photoURL);
      console.log('Profile and password updated successfully');
      this.profileForm.reset();
    } catch (error) {
      console.error('Error updating profile or password', error);
    }
  }
}
