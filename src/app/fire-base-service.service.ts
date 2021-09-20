import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireBaseServiceService {

  constructor(private firestore: AngularFirestore) { }
  addMail(mail: any): Promise<any>{
    return this.firestore.collection('mail').add(mail);
  }

  add(talk: any): Promise<any>{
    return this.firestore.collection('agenda').add(talk);
  }
  delete(id: string): Promise<any> {
    return this.firestore.collection('agenda').doc(id).delete();
  }
  update(id: string, data:any): Promise<any> {
    return this.firestore.collection('agenda').doc(id).update(data);
  }

  gettalk(): Observable<any> {
    return this.firestore.collection('agenda').snapshotChanges();
  }
  gettalkid(id: string): Observable<any> {
    return this.firestore.collection('agenda').doc(id).snapshotChanges();
  }
}
