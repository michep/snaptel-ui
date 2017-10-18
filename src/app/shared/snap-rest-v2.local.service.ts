import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Util } from './util';

import { SnapServer, SnapTask, SnapTaskInfo, SnapMetric, SnapPlugin, ISnapService } from './snap';

@Injectable()
export class SnapLocalService implements ISnapService {

  private localServerApi = 'http://localhost:3000/snapapi/';

  constructor(private http: Http, private util: Util) {
  }

  getTaskList(server: SnapServer): Observable<SnapTask[]> {
    return this.http.get(this.localServerApi + 'tasks/' + encodeURIComponent(this.util.getServerString(server)))
      .map(data => {
        return data.json()['tasks'] as SnapTask[];
      });
  }

  getTaskInfo(server: SnapServer, taskid: string): Observable<SnapTaskInfo> {
    return this.http.get(this.localServerApi + 'tasks/' + encodeURIComponent(this.util.getServerString(server)) + '/' + taskid)
      .map(data => {
        return data.json() as SnapTaskInfo;
      });
  }

  stopTask(server: SnapServer, taskid: string): Observable<string> {
    return;
  }

  startTask(server: SnapServer, taskid: string): Observable<string> {
    return;
  }

  getMetricList(server: SnapServer): Observable<SnapMetric[]> {
    return;
  }

  getPluginList(server: SnapServer): Observable<SnapPlugin[]> {
    return;
  }

}