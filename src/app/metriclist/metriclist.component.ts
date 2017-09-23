import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SnapRestV2Service } from '../shared/snap-rest-v2.service';
import { ServerlistService } from '../shared/serverlist.service';
import { Util } from '../shared/util';
import { SnapServer, SnapMetric } from '../shared/snap';

@Component({
  selector: 'app-metriclist',
  templateUrl: './metriclist.component.html',
  styleUrls: ['./metriclist.component.css']
})
export class MetriclistComponent implements OnInit {

  private server: SnapServer = <SnapServer>{};
  private serverMetrics: SnapMetric[] = [];


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
          this.snapService.getMetricList(this.server)
            .subscribe(
              (res) => {
                this.serverMetrics = res.json()['metrics'];
              }
            );
        }
      );
  }

}
