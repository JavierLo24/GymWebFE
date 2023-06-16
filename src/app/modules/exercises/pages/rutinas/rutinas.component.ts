import { Component, OnDestroy, OnInit } from '@angular/core';
import { EjerciciosService } from '../../services/ejercicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RutinaService } from '../../services/rutina.service';
import Swal from 'sweetalert2';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EjerciciosComponent } from '../ejercicios/ejercicios.component';
@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css'],
})
export class RutinasComponent implements OnInit{

  public listaEjercicios: any = [];
  
  public listaEjerciciosRutina: any = [];

  public listaEjerciciosRutinas: any = [];

  public visible = false;

  public rutinas:any = []

  public showEjercicios = false;

  public rutinaForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion:['', [Validators.required]],
  })
  
  constructor(
    private ejerciciosService:  EjerciciosService,
    private fb: FormBuilder,
    private rutinaService: RutinaService,
  ) {}

  ngOnInit(): void {
    this.listar()
    this.rutinaService.listarRutinas().subscribe({
      next: res => {
        this.rutinas = res;
      }
    })
  }


  public listar(){
    this.ejerciciosService.listExercises().subscribe({
      next: res => {
        this.listaEjercicios = res;
      }
    });  
  }

  public crearRutina(){
    const ejercicioIds = this.listaEjerciciosRutinas.map((ejercicios:any) => ejercicios.id)
    const data = {
      nombre: this.rutinaForm.controls['nombre'].value,
      descripcion: this.rutinaForm.controls['descripcion'].value,
      ejercicioIds
    }
    this.rutinaService.crearRutina(data).subscribe({
      next: (res:any) => {
        this.visible = false;
        Swal.fire({
          title: `${res.message}`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }

  /**
   * Método para validar que los inputs no presenten errores
   *
   * @params Input a validar y revisar si fue tocado por primera vez
   * @return
   */
  public isValidField(campo: string ): boolean | null  {
    return this.rutinaForm.controls[campo].invalid && this.rutinaForm.controls[campo].touched;
  }

  public listarEjercicios(id:number){
    this.showEjercicios = true;
    this.rutinaService.listarEjerciciosPorRutina(id).subscribe({
      next: res => {
        this.listaEjerciciosRutina = res;
      }
    })
  }


}
