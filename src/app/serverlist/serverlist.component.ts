import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/timeout';

import { SnapServer, IServerlistService, ISnapService } from '../shared/snap';
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
    @Inject('ISnapService') private snapService: ISnapService,
    @Inject('IServerlistService') private serversService: IServerlistService,
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
      this.serversService.removeServer(server);
    }
  }

  private updateServerList() {
    this.serversService.getServerList()
    .subscribe(
      (servers) => {
        this.servers = servers;
        this.serversAvailCheckTimer = Observable.timer(0, 5000)
          .subscribe(
            () => {
              this.checkAvailTrue();
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

  private checkAvailTrue() {
    for (const server of this.servers) {
      server.available = true;
    }
  }

}
