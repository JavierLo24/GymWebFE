import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EjerciciosComponent } from './pages/ejercicios/ejercicios.component';


@NgModule({
  declarations: [
    HomeComponent,
    EjerciciosComponent
  ],
  imports: [
    CommonModule,
    ExercisesRoutingModule,
    SharedModule,
  ]
})
export class ExercisesModule { }
