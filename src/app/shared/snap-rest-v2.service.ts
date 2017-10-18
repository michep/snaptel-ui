import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Util } from './util';

import { SnapServer, SnapTask, SnapTaskInfo, SnapMetric, SnapPlugin, ISnapService } from './snap';

@Injectable()
export class SnapRestV2Service implements ISnapService {

  private apiver = '/v2/';

  constructor(private http: Http, private util: Util) {
  }

  getTaskList(server: SnapServer): Observable<SnapTask[]> {
    return this.http.get(this.util.getServerString(server) + this.apiver + 'tasks')
      .map(data => {
        return data.json()['tasks'] as SnapTask[];
      });
  }

  getTaskInfo(server: SnapServer, taskid: string): Observable<SnapTaskInfo> {
    return this.http.get(this.util.getServerString(server) + this.apiver + 'tasks/' + taskid)
      .map(data => {
        return data.json() as SnapTaskInfo;
      });
  }

  stopTask(server: SnapServer, taskid: string): Observable<string> {
    return this.http.put(this.util.getServerString(server) + this.apiver + 'tasks/' + taskid + '?action=stop', null)
      .map(data => {
        if (data.ok) {
          return 'OK';
        } else {
          return '';
        }
      });
  }

  startTask(server: SnapServer, taskid: string): Observable<string> {
    return this.http.put(this.util.getServerString(server) + this.apiver + 'tasks/' + taskid + '?action=start', null)
      .map(data => {
        return data.text();
      });
  }

  getMetricList(server: SnapServer): Observable<SnapMetric[]> {
    return this.http.get(this.util.getServerString(server) + this.apiver + 'metrics')
      .map(data => {
        return data.json()['metrics'] as SnapMetric[];
      });
  }

  getPluginList(server: SnapServer): Observable<SnapPlugin[]> {
    return this.http.get(this.util.getServerString(server) + this.apiver + 'plugins')
      .map(data => {
        return data.json()['plugins'] as SnapPlugin[];
      });
  }

}
