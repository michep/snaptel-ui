import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SnapServer, SnapTask, SnapTaskInfo } from './snap';

@Injectable()
export class SnapRestV2Service {

  constructor(private http: Http) {
  }

  getTaskList(server: SnapServer) {
   return this.http.get(this.getServerUrl(server) + '/tasks');
  }

  private getServerUrl(server: SnapServer): string {
    return server.proto + '://' + server.host + ':' + server.port + '/v2';
  }
}
