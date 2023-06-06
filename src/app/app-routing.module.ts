import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path: 'auth',
  loadChildren: () => import('./modules/auth/auth.module').then(a => a.AuthModule),
},
{
  path: 'gimnasio',
  loadChildren: () => import('./modules/exercises/exercises.module').then(a => a.ExercisesModule),
},
{
  path: '**',
  redirectTo: 'auth'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
