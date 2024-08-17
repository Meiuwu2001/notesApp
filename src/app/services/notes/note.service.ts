import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

export interface Note {
  title: string,
  description: string,
  id?: string,
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private _notes = new BehaviorSubject<Note[]>([])

  get notes() {
    return this._notes.asObservable();
  }
  constructor(private firestore: Firestore) { }
  async addNote(data: Note) {
    try {
      let dataRef: any = collection(this.firestore, 'notes')
      const response = await addDoc(dataRef, data)
      const id = await response?.id
      let currentNotes = this._notes.value;
      let notes: Note[] = [{ ...data, id }]
      notes = notes.concat(currentNotes)
      this._notes.next(notes);
      return notes;
    } catch (e) {
      throw (e);
    }
  }
  async getNotes() {
    try {
      let dataRef: any = collection(this.firestore, 'notes')
      // let queryData = query(
      //   dataRef,
      //   where('title', '==', 'asd'),
      // );
      const querySnapshot = await getDocs(dataRef);
      const notes: Note[] = await querySnapshot.docs.map((doc) => {
        let item: any = doc.data();
        item.id = doc.id;
        return item;
      })
      this._notes.next(notes)
      return notes;

    } catch (e) {
      throw (e);
    }

  }
  async updateNote(id: string, data: Note) {
    try {
      let dataRef: any = doc(this.firestore, `notes/${id}`)
      await updateDoc(dataRef, data);

      let currentNotes = this._notes.value;
      const index = currentNotes.findIndex(x => x.id == id);
      currentNotes[index] = { id, ...data }
      const latestData = { id, ...data }
      this._notes.next(currentNotes);
      return latestData
    } catch (e) {
      throw (e);
    }
  }
  async deleteNote(id: string) {
    try {
      let dataRef: any = doc(this.firestore, `notes/${id}`)
      await deleteDoc(dataRef);
      let currentNotes = this._notes.value;
      currentNotes = currentNotes.filter(x => x.id != id);
      this._notes.next(currentNotes);
    } catch (e) {
      throw (e);
    }
  }

}
