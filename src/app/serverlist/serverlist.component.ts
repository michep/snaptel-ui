import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/timeout';

import { ServerlistService } from '../shared/serverlist.service';
import { SnapRestV2Service } from '../shared/snap-rest-v2.service';
import { SnapServer } from '../shared/snap';
import { Util } from '../shared/util';

@Component({
  selector: 'app-serverlist',
  templateUrl: './serverlist.component.html',
  styleUrls: ['./serverlist.component.css']
})
export class ServerlistComponent implements OnInit {

  private servers: SnapServer[] = [];
  private serversAvailCheck: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serverlistService: ServerlistService,
    private snapService: SnapRestV2Service,
    private util: Util
  ) { }

  ngOnInit() {
    this.serverlistService.getServerList()
      .subscribe(
        (servers) => {
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
        }
      );
  }

  private deleteServer(server: SnapServer) {
    if (confirm('Remove this server, really?')) {
      this.serverlistService.removeServer(server);
    }
  }

}
