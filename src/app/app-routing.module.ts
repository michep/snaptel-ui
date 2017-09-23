import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServerlistComponent } from './serverlist/serverlist.component';
import { ServereditComponent } from './serveredit/serveredit.component';
import { TasklistComponent } from './tasklist/tasklist.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/servers'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'servers',
    component: ServerlistComponent
  },
  {
    path: 'servers/new',
    component: ServereditComponent
  },
  {
    path: 'servers/:servername/tasks',
    component: TasklistComponent
  },
  {
    path: 'servers/:servername/edit',
    component: ServereditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
