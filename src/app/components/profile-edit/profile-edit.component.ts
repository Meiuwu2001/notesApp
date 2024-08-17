import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  profileImageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {
    this.profileForm = this.fb.group({
      displayName: [''],
      phoneNumber: [''],
      photoURL: ['']
    });
  }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(profile => {
      this.profileForm.patchValue(profile);
      this.profileImageUrl = profile.photoURL;
    });
  }

  async onSubmit() {
    try {
      await this.profileService.updateUserProfile(this.profileForm.value);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile', error);
    }
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      if (image.webPath) {
        // Convertir la imagen a un blob
        const response = await fetch(image.webPath);
        const imageBlob = await response.blob();

        const imageUrl = await this.profileService.uploadProfileImage(imageBlob);
        this.profileForm.patchValue({ photoURL: imageUrl });
        this.profileImageUrl = imageUrl;
      }
    } catch (error) {
      console.error('Error taking picture', error);
    }
  }

}
