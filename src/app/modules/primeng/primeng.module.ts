import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    TableModule,
  ]
})
export class PrimengModule { }
