import { Component, OnInit } from '@angular/core';
import { EjerciciosService } from '../../services/ejercicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal  from 'sweetalert2';
@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent  implements OnInit{
  
  public ejercicios = []
  public visible = false;

  public musculosObjetivo: any = []
  public partesDelCuerpo: any = []
  public listaEjercicios: any = []

  public ejerciciosForm: FormGroup = this.fb.group({
    descripcion: ['', [Validators.required]],
    musculo: ['', [Validators.required]],
    parteCuerpo: ['', [Validators.required]],
    url : ['', [Validators.required]],
  })

  constructor(
    private ejerciciosService:  EjerciciosService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.ejerciciosService.getObjectivesMuscles().subscribe({
      next: res => {
        this.musculosObjetivo = res;
      }
    });
    this.ejerciciosService.getPartOfBody().subscribe({
      next: res => {
        this.partesDelCuerpo = res;
      }
    });  
    this.listar();
  }

  public registrar(){

    const ejercicioData = {
      descripcion: this.ejerciciosForm.controls['descripcion'].value,
      musculoObjetivo_id: parseInt(this.ejerciciosForm.controls['musculo'].value),
      parteCuerpo_id: parseInt(this.ejerciciosForm.controls['parteCuerpo'].value),
      urlGif : this.ejerciciosForm.controls['url'].value
    };

    this.ejerciciosService.createExercise(ejercicioData).subscribe({
      next: (res:any) => {
        this.visible = false;
        Swal.fire({
          title: `${res.message}`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })
        this.listar();
      },
      error: err => {
        console.log(err)
      }
    })
  }

  public delete(ejercicio: number){
    this.ejerciciosService.delete(ejercicio).subscribe({
      next: (res:any) => {
        this.visible = false;
        Swal.fire({
          title: `${res.message}`,
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })
        this.listar();
      },
      error: err => {
        console.log(err)
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
}
