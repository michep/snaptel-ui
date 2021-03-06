import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { UUID } from 'angular2-uuid';

import { Util } from './util';

import { SnapServer, IServerlistService } from '../shared/snap';


@Injectable()
export class ServerlistLocalService implements IServerlistService {

  private localServerApi = 'http://bux.mfms:4040/serversapi/';
  // private localServerApi = 'http://localhost:3000/serversapi/';

  constructor(private http: Http, private util: Util) {
  }

  newServer(server: SnapServer): Observable<any> {
    server.key = UUID.UUID();
    return this.http.post(this.localServerApi, server);
  }

  updateServer(server: SnapServer): Observable<any> {
    return this.http.put(this.localServerApi + server.key, server);
  }

  removeServer(server: SnapServer): Observable<any> {
    return this.http.delete(this.localServerApi + server.key);
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
        servers.sort(this.compareSnapServers);
        return servers;
      }
    );
  }

  private compareSnapServers(a: SnapServer, b: SnapServer): number {
    if (a.host === b.host) {
      return 0;
    }
    if (a.host < b.host) {
      return -1;
    } else {
      return 1;
    }
  }

}

