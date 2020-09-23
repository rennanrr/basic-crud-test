import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';

const routes: Routes = [
  { path: 'person', component: PersonComponent },
  { path: 'home', component: HomeComponent },
  {
    path: '**',
    redirectTo: 'home',
  }
];

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes), NgxMaskModule.forRoot(maskConfig), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
