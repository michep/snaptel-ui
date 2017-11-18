import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

import { UUID } from 'angular2-uuid';

import { SnapServer, IServerlistService } from '../shared/snap';


@Injectable()
export class ServerlistService implements IServerlistService {
  private snapServersKey = 'snaptel_servers';

  constructor(private db: AngularFireDatabase) {
  }

  newServer(server: SnapServer): Observable<any> {
    server.key = UUID.UUID();
    return Observable.fromPromise(
      this.db.object(this.snapServersKey + '/' + server.key)
      .set(
        {proto: server.proto, host: server.host, port: server.port, key: server.key}
      )
    );
  }

  updateServer(server: SnapServer): Observable<any>  {
    return Observable.fromPromise(
      this.db.object(this.snapServersKey + '/' + server.key)
      .set(
        {proto: server.proto, host: server.host, port: server.port, key: server.key}
      )
    );
  }

  removeServer(server: SnapServer): Observable<any>  {
    return Observable.fromPromise(
      this.db.object(this.snapServersKey + '/' + server.key).remove()
    );
  }

  getServer(key: string): Observable<SnapServer> {
    return this.db.object(this.snapServersKey + '/' + key)
      .valueChanges()
      .map(item => {
        const server: SnapServer = <SnapServer>item;
        return server;
      });
  }

  getServerList(): Observable<SnapServer[]> {
    return this.db.list(this.snapServersKey)
      .valueChanges()
      .map(item => {
        const servers: SnapServer[] = <SnapServer[]>item;
        return servers;
      });
  }

}
