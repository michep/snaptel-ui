import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SnapRestV2Service } from '../shared/snap-rest-v2.service';
import { ServerlistService } from '../shared/serverlist.service';
import { Util } from '../shared/util';
import { SnapServer, SnapTask } from '../shared/snap';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  private server: SnapServer = <SnapServer>{};
  private serverTasks: SnapTask[] = [];

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
          this.snapService.getTaskList(this.server)
            .subscribe(
              (res) => {
                this.serverTasks = res.json()['tasks'];
              }
            );
        }
      );
  }

}
