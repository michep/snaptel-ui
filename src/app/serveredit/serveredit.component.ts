import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { ServerlistService } from '../shared/serverlist.service';
import { SnapServer } from '../shared/snap';

@Component({
  selector: 'app-serveredit',
  templateUrl: './serveredit.component.html',
  styleUrls: ['./serveredit.component.css']
})
export class ServereditComponent implements OnInit {

  private form: FormGroup;
  private state: string;
  private server: SnapServer = <SnapServer>{};
  private oldserver: SnapServer;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private serversService: ServerlistService,
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      proto: '',
      hostname: '',
      port: ''
    });

    const snapshot = this.activatedRoute.snapshot;
    if (snapshot.url[snapshot.url.length - 1].path === 'new') {
      this.state = 'new';
    } else {
      this.state = 'edit';
      this.serversService.getServer(this.activatedRoute.snapshot.params['serverid'])
        .subscribe(
          (server) => {
            this.server = server;
            this.oldserver = {proto: server.proto, host: server.host, port: server.port, key: server.key, available: null};
          }
        );
    }
  }

  private saveServer(server: SnapServer) {
    if (this.state === 'new') {
      this.serversService.newServer(server);
    } else {
      this.serversService.updateServer(this.oldserver, server);
    }
    this.router.navigate(['servers']);
  }

}
