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

  getTaskInfo(server: SnapServer, taskid: string) {
    return this.http.get(this.getServerUrl(server) + '/tasks/' + taskid);
   }

   getMetricList(server: SnapServer) {
    return this.http.get(this.getServerUrl(server) + '/metrics');
   }

   getPluginList(server: SnapServer) {
    return this.http.get(this.getServerUrl(server) + '/plugins');
   }

   private getServerUrl(server: SnapServer): string {
    return server.proto + '://' + server.host + ':' + server.port + '/v2';
  }
}
