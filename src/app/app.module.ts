import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ServerlistComponent } from './serverlist/serverlist.component';
import { ServereditComponent } from './serveredit/serveredit.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskinfoComponent } from './taskinfo/taskinfo.component';
import { MetriclistComponent } from './metriclist/metriclist.component';
import { PluginlistComponent } from './pluginlist/pluginlist.component';

import { ServerlistService } from './shared/serverlist.service';
import { SnapRestV2Service } from './shared/snap-rest-v2.service';
import { Util } from './shared/util';

@NgModule({
  declarations: [
    AppComponent,
    ServerlistComponent,
    TasklistComponent,
    TaskinfoComponent,
    ServereditComponent,
    MetriclistComponent,
    PluginlistComponent
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
    ServerlistService,
    SnapRestV2Service,
    Util
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
