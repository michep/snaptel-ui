import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/timeout';

import { ServerlistService } from '../shared/serverlist.service';
import { SnapRestV2Service } from '../shared/snap-rest-v2.service';
import { SnapServer } from '../shared/snap';

@Component({
  selector: 'app-serverlist',
  templateUrl: './serverlist.component.html',
  styleUrls: ['./serverlist.component.css']
})
export class ServerlistComponent implements OnInit {

  private servers: SnapServer[] = [];

  constructor(
    private router: Router,
    private http: Http,
    private serverlistService: ServerlistService,
    private snapService: SnapRestV2Service
  ) { }

  ngOnInit() {
    this.serverlistService.getServerList()
      .subscribe(servers => {
        this.servers = servers;
        Observable.from(this.servers)
          .map(item => {
            const server: SnapServer = <SnapServer>item;
            server.key = item['$key'];
            this.snapService.getTaskList(server)
              .timeout(250)
              .subscribe(
                (res) => {
                  server.available = true;
                },
                (err) => {
                  server.available = false;
                }
              );
            return server;
          })
          .subscribe();
      });
  }

  private deleteServer(server: SnapServer) {
    this.serverlistService.removeServer(server);
  }

}
