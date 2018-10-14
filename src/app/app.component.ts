import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

import firebaseSettings from './firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'angular-firestore';

  ngOnInit() {
    firebase.initializeApp(firebaseSettings['config']);
    firebase.firestore().settings(firebaseSettings['settings']);
  }
}
