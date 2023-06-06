import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntrenadoresComponent } from './pages/entrenadores/entrenadores.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    EntrenadoresComponent
  ],
  imports: [
    CommonModule,
    ExercisesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ExercisesModule { }
