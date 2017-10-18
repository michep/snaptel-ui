import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UUID } from 'angular2-uuid';

import { Util } from './util';

import { SnapServer, IServerlistService } from '../shared/snap';


@Injectable()
export class ServerlistLocalService implements IServerlistService {

  private localServerApi = 'http://localhost:3000/servers/';

  constructor(private http: Http, private util: Util) {
  }

  newServer(server: SnapServer) {
  }

  updateServer(oldserver, server: SnapServer) {
  }

  removeServer(server: SnapServer) {
  }

  getServer(key: string): Observable<SnapServer> {
    return this.http.get(this.localServerApi + key)
      .map(
        data => {
          return data.json() as SnapServer;
        }
      );
  }

  getServerList(): Observable<SnapServer[]> {
    return this.http.get(this.localServerApi)
    .map(
      data => {
        const servers: SnapServer[] = [];
        const d = data.json();
        for (const k of Object.keys(d)) {
          servers.push(d[k] as SnapServer);
        }
        return servers;
      }
    );
  }

}
