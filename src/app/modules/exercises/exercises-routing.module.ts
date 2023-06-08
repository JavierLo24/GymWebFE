import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EjerciciosComponent } from './pages/ejercicios/ejercicios.component';
import { PlanesComponent } from './pages/planes/planes.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'ejercicios',
    component: EjerciciosComponent
  },

  {
    path: 'planes',
    component: PlanesComponent
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
