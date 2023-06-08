import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EjerciciosComponent } from './pages/ejercicios/ejercicios.component';
import { HttpClientModule } from '@angular/common/http';
import { PlanesComponent } from './pages/planes/planes.component';


@NgModule({
  declarations: [
    HomeComponent,
    EjerciciosComponent,
    PlanesComponent
  ],
  imports: [
    CommonModule,
    ExercisesRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class ExercisesModule { }
