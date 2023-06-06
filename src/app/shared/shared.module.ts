import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashNavbarComponent } from './components/dash-navbar/dash-navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from '../modules/primeng/primeng.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashNavbarComponent,
    SidebarComponent
  ],
  exports: [
    DashNavbarComponent,
    SidebarComponent,
    PrimengModule,
    FormsModule,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
