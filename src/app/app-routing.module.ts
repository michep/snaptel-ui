import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServerlistComponent } from './serverlist/serverlist.component';
import { ServereditComponent } from './serveredit/serveredit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'servers',
    component: ServerlistComponent
  },
  {
    path: 'servers/:servername',
    component: ServereditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
