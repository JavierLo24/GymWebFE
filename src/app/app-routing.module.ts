import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { AuthGuard } from './modules/exercises/guards/auth.guard';

const routes: Routes = [
{
  path: 'auth',
  loadChildren: () => import('./modules/auth/auth.module').then(a => a.AuthModule),
},
{
  path: 'admin',
  component: DashboardComponent,
  canActivate: [AuthGuard],
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
