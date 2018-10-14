import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})

export class FsService {
  ref = firebase.firestore().collection('boards');
  boardDetail = null;

  constructor() { }

  getBoards(): Observable<any> {
    return new Observable((observer) => {
      this.ref.onSnapshot((querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          boards.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            author: data.author
          });
        });
        observer.next(boards);
      });
    });
  }

  getBoard(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc) => {
        const data = doc.data();
        const obj = {
          id: doc.id,
          title: data.title,
          description: data.description,
          author: data.author
        };
        observer.next(obj);
      });
    });
  }

  postBoards(data): Observable<any> {
    return new Observable((observer) => {
      this.ref.add(data).then((doc) => {
        observer.next({
          id: doc.id,
        });
      });
    });
  }

  updateBoard(id: string, data): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).set(data).then((doc) => {
        observer.next();
      });
    });
  }

  deleteBoard(id: string): Observable<{}> {
    return new Observable((observer) => {
      this.ref.doc(id).delete().then(() => {
        observer.next();
      });
    });
  }

  setBoardLocal(data) {
    return new Observable((observer) => {
      this.boardDetail = data;
      observer.next(data);
    });
  }

  getBoardLocal(): Observable<any> {
    return new Observable((observer) => {
      observer.next(this.boardDetail);
    });
  }
}
