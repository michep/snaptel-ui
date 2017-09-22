import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { ServerlistService} from '../services/serverlist.service';
import { SnapServer } from '../types/snap';

@Component({
  selector: 'app-serverlist',
  templateUrl: './serverlist.component.html',
  styleUrls: ['./serverlist.component.css']
})
export class ServerlistComponent implements OnInit {

  private servers: SnapServer[] = [];

  constructor(private serversService: ServerlistService,private router: Router) {
  }

  ngOnInit() {
    this.serversService.getServerListWithAvailability()
      .subscribe(server => this.servers.push(server));
  }

  private clickOpen(server: SnapServer) {
    this.router.navigate(['servers', server.key]);
  }

  private clickEdit(server: SnapServer) {
    this.router.navigate(['servers', server.key, 'edit']);
  }

  // private getBGColor(server: SnapServer): string {
  //   if (server.available) {
  //     return 'PaleGreen';
  //   } else {
  //     return 'LightPink';
  //   }
  // }
}
