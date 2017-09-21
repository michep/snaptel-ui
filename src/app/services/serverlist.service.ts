import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';


import { SnapServer } from '../types/snap';


@Injectable()
export class ServerlistService {
  private snapServersKey = 'snaptel_servers';

  constructor(private http: Http, private db: AngularFireDatabase) {
  }

  getServerList(): Observable<SnapServer> {
    return this.db.list(this.snapServersKey)
      .concatMap(items => {
        return Observable.from(items)
          .map(item => {
            const server: SnapServer = <SnapServer>item;
            server.key = item['$key'];
            this.http.get(server.proto + '://' + server.host + ':' + server.port + '/v2/tasks')
              .timeout(250)
              .subscribe(
                () => {
                  server.available = true;
                },
                () => {
                  server.available = false;
                }
              );
            return server;
          });
      });
  }

}
