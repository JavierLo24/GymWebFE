import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { PickListModule } from 'primeng/picklist';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  exports:[
    InputTextModule,
    PasswordModule,
    ButtonModule,
    TableModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    CardModule,
    PickListModule,
    DragDropModule,
    DynamicDialogModule
  ]
})
export class PrimengModule { }
