import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SnapRestV2Service } from '../shared/snap-rest-v2.service';
import { ServerlistService } from '../shared/serverlist.service';
import { Util } from '../shared/util';
import { SnapServer, SnapPlugin } from '../shared/snap';

@Component({
  selector: 'app-pluginlist',
  templateUrl: './pluginlist.component.html',
  styleUrls: ['./pluginlist.component.css']
})
export class PluginlistComponent implements OnInit {

  private server: SnapServer = <SnapServer>{};
  private serverPlugins: SnapPlugin[] = [];

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
          this.snapService.getPluginList(this.server)
            .subscribe(
              (res) => {
                this.serverPlugins = res;
              }
            );
        }
      );
  }

}
