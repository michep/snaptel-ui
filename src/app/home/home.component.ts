import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { SnapTaskInfo } from '../types/snap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: FirebaseListObservable<any[]>;

  constructor(private http: Http, private db: AngularFireDatabase) {
    this.items = db.list('/snaptel_servers');
   }

  ngOnInit() {
  }

  click() {
    this.http.get('http://mda.mfms:8181/v2/tasks')
      .subscribe(res => {
        console.log(res);
      });
  }

}
