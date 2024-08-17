import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicModule, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Subscription } from 'rxjs';
import { Note, NoteService } from 'src/app/services/notes/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal!: IonModal;
  noteSub!: Subscription;
  model: any = {};
  notes: Note[] = [];
  isOpen: boolean = false
  constructor(private note: NoteService) { }

  ngOnInit(): void {
    this.note.getNotes()
    this.noteSub = this.note.notes.subscribe({
      next: (notes) => {
        this.notes = notes;
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    this.model = {};
    this.isOpen = false;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async save(form: NgForm) {
    try {
      if (!form.valid) {
        return;
      }
      // console.log(form.value);
      if (this.model?.id) await this.note.updateNote(this.model.id, form.value)
      else await this.note.addNote(form.value);
      this.modal.dismiss(); // Cierra el modal después de guardar
    } catch (e) {
      console.log(e);
    }
  }
  editNote(note: Note) {
    this.isOpen = true;
    this.model = { ...note }
  }
  async deleteNote(note: Note) {
    try {
      await this.note.deleteNote(note?.id!);
    } catch (e) {
      console.log(e)
    }
  }

  ngOnDestroy(): void {
    if (this.noteSub) {
      this.noteSub.unsubscribe(); // Cancela la suscripción
    }
  }
}