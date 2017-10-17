import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SnapRestV2Service } from '../shared/snap-rest-v2.service';
import { ServerlistService } from '../shared/serverlist.service';
import { Util } from '../shared/util';
import { SnapServer, SnapTaskInfo } from '../shared/snap';

@Component({
  selector: 'app-taskinfo',
  templateUrl: './taskinfo.component.html',
  styleUrls: ['./taskinfo.component.css']
})
export class TaskinfoComponent implements OnInit {

  private server: SnapServer = <SnapServer>{};
  private taskInfo: SnapTaskInfo = <SnapTaskInfo>{};
  private metrics: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snapService: SnapRestV2Service,
    private serversService: ServerlistService,
    private util: Util
  ) { }

  ngOnInit() {
    this.serversService.getServer(this.activatedRoute.snapshot.params['serverid'])
      .subscribe(
        (server) => {
          this.server = server;
          this.snapService.getTaskInfo(server, this.activatedRoute.snapshot.params['taskid'])
            .subscribe(
              (res) => {
                this.taskInfo = res;
                this.metrics = Object.keys(this.taskInfo.workflow.collect.metrics);
              }
            );
        }
      );
  }

  stopTask(task: SnapTaskInfo) {
    this.snapService.stopTask(this.server, task.id)
      .subscribe(
        () => task.task_state = 'Stopped'
      );
  }

  startTask(task: SnapTaskInfo) {
    this.snapService.startTask(this.server, task.id)
      .subscribe(
        () => task.task_state = 'Running'
      );
  }

}
