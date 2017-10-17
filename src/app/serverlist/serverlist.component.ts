import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
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
export class ServerlistComponent implements OnInit, OnDestroy {

  private servers: SnapServer[] = [];
  private serversAvailCheck: Observable<any>;
  private refreshTimer: Subscription;
  private serversAvailCheckTimer: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serverlistService: ServerlistService,
    private snapService: SnapRestV2Service,
    private util: Util
  ) { }

  ngOnInit() {
    this.updateServerList();
  }

  ngOnDestroy() {
    this.serversAvailCheckTimer.unsubscribe();
  }

  private deleteServer(server: SnapServer) {
    if (confirm('Remove this server, really?')) {
      this.serverlistService.removeServer(server);
    }
  }

  private updateServerList() {
    this.serverlistService.getServerList()
    .subscribe(
      (servers) => {
        this.servers = servers;
        this.serversAvailCheckTimer = Observable.timer(0, 5000)
          .subscribe(
            () => {
              this.checkAvail();
            }
          );
      }
    );
  }

  private checkAvail() {
    for (const server of this.servers) {
      this.snapService.getTaskList(server)
        .timeout(500)
        .subscribe(
          (res) => {
            server.available = true;
          },
          (err) => {
            server.available = false;
          }
        );
    }
  }

}
