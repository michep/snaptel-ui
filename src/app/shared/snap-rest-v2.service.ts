import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Util } from './util';

import { SnapServer, SnapTask, SnapTaskInfo } from './snap';

@Injectable()
export class SnapRestV2Service {

  private apiver = '/v2/';

  constructor(private http: Http, private util: Util) {
  }

  getTaskList(server: SnapServer) {
    return this.http.get(this.util.getServerString(server) + this.apiver + 'tasks');
  }

  getTaskInfo(server: SnapServer, taskid: string) {
    return this.http.get(this.util.getServerString(server) + this.apiver + 'tasks/' + taskid);
  }

  stopTask(server: SnapServer, taskid: string) {
    return this.http.put(this.util.getServerString(server) + this.apiver + 'tasks/' + taskid + '?action=stop', null);
  }

  startTask(server: SnapServer, taskid: string) {
    return this.http.put(this.util.getServerString(server) + this.apiver + 'tasks/' + taskid + '?action=start', null);
  }

  getMetricList(server: SnapServer) {
    return this.http.get(this.util.getServerString(server) + this.apiver + 'metrics');
  }

  getPluginList(server: SnapServer) {
    return this.http.get(this.util.getServerString(server) + this.apiver + 'plugins');
  }
}
