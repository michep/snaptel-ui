import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { SnapServer, IServerlistService } from '../shared/snap';

@Component({
  selector: 'app-serveredit',
  templateUrl: './serveredit.component.html',
  styleUrls: ['./serveredit.component.css']
})
export class ServereditComponent implements OnInit {

  private form: FormGroup;
  private state: string;
  private server: SnapServer = <SnapServer>{};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject('IServerlistService') private serversService: IServerlistService,
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
            this.server.key = server.key;
          }
        );
    }
  }

  private saveServer(server: SnapServer) {
    let s;
    if (this.state === 'new') {
      s = this.serversService.newServer(server);
    } else {
      s = this.serversService.updateServer(server);
    }
    s.subscribe(() => this.router.navigate(['servers']));
  }

}
