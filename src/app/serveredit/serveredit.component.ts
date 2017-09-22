import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';

import { ServerlistService} from '../services/serverlist.service';
import { SnapServer } from '../types/snap';

@Component({
  selector: 'app-serveredit',
  templateUrl: './serveredit.component.html',
  styleUrls: ['./serveredit.component.css']
})
export class ServereditComponent implements OnInit {

  private form: FormGroup;
  private servername: string;
  private state: string;
  private server: SnapServer;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private serversService: ServerlistService) {
    this.server = <SnapServer>{};
    const snapshot = activatedRoute.snapshot;
    if (snapshot.url[snapshot.url.length - 1].path === 'new') {
      this.state = 'new';
    } else {
      this.state = 'edit';
      this.servername = activatedRoute.snapshot.params['servername'];
      serversService.getServer(this.servername)
      .subscribe(server => {
        this.server = server;
      });
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      proto: '',
      hostname: '',
      port: ''
    });
  }

  private saveServer(server: SnapServer) {
    console.log(this.state, server);
  }

}
