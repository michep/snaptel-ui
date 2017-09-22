import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-serverinfo',
  templateUrl: './serverinfo.component.html',
  styleUrls: ['./serverinfo.component.css']
})
export class ServerinfoComponent implements OnInit {

  private servername: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.servername = activatedRoute.snapshot.params['servername'];
  }

  ngOnInit() {
  }

}
