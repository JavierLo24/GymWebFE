import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { EjerciciosComponent } from './pages/ejercicios/ejercicios.component';
import { HttpClientModule } from '@angular/common/http';
import { PlanesComponent } from './pages/planes/planes.component';
import { EntrenadoresComponent } from './pages/entrenadores/entrenadores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [
    HomeComponent,
    EntrenadoresComponent,
    EjerciciosComponent,
    PlanesComponent
  ],
  imports: [
    CommonModule,
    ExercisesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PrimengModule
  ]
})
export class ExercisesModule { }
