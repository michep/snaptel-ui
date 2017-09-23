import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnapRestV2Service } from '../shared/snap-rest-v2.service';
import { ServerlistService } from '../shared/serverlist.service';

import { SnapServer, SnapTask } from '../shared/snap';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  private servername: string;
  private server: SnapServer;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snapService: SnapRestV2Service,
    private serversService: ServerlistService
  ) {
    this.server = <SnapServer>{};
    this.servername = activatedRoute.snapshot.params['servername'];
    serversService.getServer(this.servername)
      .subscribe(server => {
        this.server = server;
        this.snapService.getTaskList(server)
          .subscribe(
            (res) => console.log(res.json())
          );
      });
  }

  ngOnInit() {
  }

}
