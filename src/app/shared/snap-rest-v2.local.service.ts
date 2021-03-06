import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

import { Util } from './util';

import { SnapServer, SnapTask, SnapTaskInfo, SnapMetric, SnapPlugin, ISnapService } from './snap';

@Injectable()
export class SnapLocalService implements ISnapService {

  private localServerApi = 'http://bux.mfms:4040/snapapi/';
  // private localServerApi = 'http://localhost:3000/snapapi/';

  constructor(private http: Http, private util: Util) {
  }

  getTaskList(server: SnapServer): Observable<SnapTask[]> {
    return this.http.get(this.localServerApi + 'tasks/' + encodeURIComponent(this.util.getServerString(server)))
      .timeout(1000)
      .map(
        data => {
          return data.json()['tasks'] as SnapTask[];
        }
      );
  }

  getTaskInfo(server: SnapServer, taskid: string): Observable<SnapTaskInfo> {
    return this.http.get(this.localServerApi + 'tasks/' + encodeURIComponent(this.util.getServerString(server)) + '/' + taskid)
      .timeout(1000)
      .map(
        data => {
          return data.json() as SnapTaskInfo;
        }
      );
  }

  stopTask(server: SnapServer, taskid: string): Observable<string> {
    return this.http.put(this.localServerApi + 'tasks/' + encodeURIComponent(this.util.getServerString(server)) + '/' + taskid + '?action=stop', null)
      .timeout(1000)
      .map(
        data => {
          return data.text();
        }
      );
  }

  startTask(server: SnapServer, taskid: string): Observable<string> {
    return this.http.put(this.localServerApi + 'tasks/' + encodeURIComponent(this.util.getServerString(server)) + '/' + taskid + '?action=start', null)
    .timeout(2000)
    .map(
      data => {
        return data.text();
      }
    );
}

  getMetricList(server: SnapServer): Observable<SnapMetric[]> {
    return this.http.get(this.localServerApi + 'metrics/' + encodeURIComponent(this.util.getServerString(server)))
      .timeout(1000)
      .map(
        (data) => {
          return data.json()['metrics'] as SnapMetric[];
        }
      );
  }

  getPluginList(server: SnapServer): Observable<SnapPlugin[]> {
    return this.http.get(this.localServerApi + 'plugins/' + encodeURIComponent(this.util.getServerString(server)))
      .timeout(1000)
      .map(
        (data) => {
          return data.json()['plugins'] as SnapPlugin[];
        }
      );
  }

}
