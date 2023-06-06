import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from 'src/app/layout/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'backlog',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
    ]
  },
  {
   path: '**',
   redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule { }
