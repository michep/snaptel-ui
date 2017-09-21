import { Component, OnInit } from '@angular/core';
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

  constructor(private serversService: ServerlistService) {
  }

  ngOnInit() {
    this.serversService.getServerList()
      .subscribe(server => this.servers.push(server));
  }

  private clickOpen(server: SnapServer) {
    console.log('open', server);
  }

  private clickEdit(server: SnapServer) {
    console.log('edit', server);
  }

  private getBGColor(server: SnapServer): string {
    if (server.available) {
      return 'PaleGreen';
    } else {
      return 'LightPink';
    }
  }
}
