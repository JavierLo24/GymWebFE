import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { PlanService } from '../../services/plan.service';
import { ClientesService } from '../../services/clientes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public visible: boolean = false;

  //arreglo de clientes
  public clientes :any = [
 
  ]
  // formulario para inscribir a un nuevo clinete
  public clienteForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    peso: ['', [Validators.required]],
    altura: ['', [Validators.required]],
    fechaNacimiento: ['', [Validators.required]],
    mensualidad: ['', [Validators.required]],
  })

  // genero
  public sexoSelect = [
    { sex: "Maculino"},
    { sex: "Femenino"},
  ]


  constructor(
    private clienteService: ClientesService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
   this.clienteService.listClientes().subscribe({
    next: res => {
      this.clientes = res;
    }
   })
  }

  public clear(table: Table){
    table.clear()
  }

  public filtrar(event:any, table:Table){
    table.filterGlobal(event.target.value, 'contains');
  }

  public showDialog() {
    this.visible = true;
  }

  public registrar(){
    const cliente = {
      nombre: this.clienteForm.get('nombre')?.value,
      peso: this.clienteForm.get('peso')?.value,
      altura: this.clienteForm.get('altura')?.value,
      fechaInicioMensualidad: this.clienteForm.get('mensualidad')?.value,
      fechaNacimiento: this.clienteForm.get('fechaNacimiento')?.value,
      genero: this.clienteForm.get('genero')?.value,
    }
    
    this.clienteService.registerCliente(cliente).subscribe({
      next: res => {
        window.location.reload()
      }
    })

  }

}
