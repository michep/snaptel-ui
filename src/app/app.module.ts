import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ServerlistComponent } from './serverlist/serverlist.component';
import { ServerinfoComponent } from './serverinfo/serverinfo.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskinfoComponent } from './taskinfo/taskinfo.component';

import { ServerlistService } from './services/serverlist.service';
import { ServereditComponent } from './serveredit/serveredit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServerlistComponent,
    ServerinfoComponent,
    TasklistComponent,
    TaskinfoComponent,
    ServereditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [
    ServerlistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
