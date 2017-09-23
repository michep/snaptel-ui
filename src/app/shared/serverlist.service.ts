import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UUID } from 'angular2-uuid';

import { SnapServer } from '../shared/snap';


@Injectable()
export class ServerlistService {
  private snapServersKey = 'snaptel_servers';

  constructor(private db: AngularFireDatabase) {
  }

  newServer(server: SnapServer) {
    server.key = UUID.UUID();
    this.db.object(this.snapServersKey + '/' + server.key).set({proto: server.proto, host: server.host, port: server.port});
  }

  updateServer(oldserver, server: SnapServer) {
    this.db.object(this.snapServersKey + '/' + oldserver.key).remove()
      .then(_ => this.db.object(this.snapServersKey + '/' + server.key).set({proto: server.proto, host: server.host, port: server.port}));
  }

  removeServer(server: SnapServer) {
    this.db.object(this.snapServersKey + '/' + server.key).remove();
  }

  getServer(key: string): Observable<SnapServer> {
    return this.db.object(this.snapServersKey + '/' + key)
      .map(item => {
        const server: SnapServer = <SnapServer>item;
        server.key = item['$key'];
        return server;
      });
  }

  getServerList(): Observable<SnapServer[]> {
    return this.db.list(this.snapServersKey);
  }

}
