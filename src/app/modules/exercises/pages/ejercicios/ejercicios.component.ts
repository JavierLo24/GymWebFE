import { Component, OnInit } from '@angular/core';
import { EjerciciosService } from '../../services/ejercicios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal  from 'sweetalert2';
import { Ejercicios } from '../../../../data/interfaces/Ejercicio.interface';
@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent  implements OnInit{

  public ejercicios!: Ejercicios | null;
  public visible = false;
  public visible2 = false;
  public exerciseId= -1;

  public musculosObjetivo: any = []
  public partesDelCuerpo: any = []
  public listaEjercicios: any = []

  public header = '';

  public ejerciciosForm: FormGroup = this.fb.group({
    descripcion: ['', [Validators.required]],
    musculo: ['', [Validators.required]],
    parteCuerpo: ['', [Validators.required]],
    url: ['', [Validators.required]],
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

  /**
   * Método para validar que los inputs no presenten errores
   *
   * @params Input a validar y revisar si fue tocado por primera vez
   * @return
   */
  isValidField(field: string): boolean | null {
    return (
      this.ejerciciosForm.controls[field].errors &&
      this.ejerciciosForm.controls[field].touched
    );
  }

  /**
   * Método para activar el botón siempre y cuando no hayan errores en los inputs del formulario
   *
   * @params
   * @return
   */
  onSave(): void {
    if (this.ejerciciosForm.invalid) {
      this.ejerciciosForm.markAllAsTouched();
      return;
    }
  }


  /**
   * Método para registrar ejercicios
   *
   * @params
   * @return mensaje de confirmacion
   */
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
/**
   * Método para editar ejercicios
   *
   * @params
   * @return mensaje de confirmacion
   */
  public editar(){
    const id = this.exerciseId;
    const ejercicioData2 = {
      descripcion: this.ejerciciosForm.controls['descripcion'].value,
      musculoObjetivo_id: parseInt(this.ejerciciosForm.controls['musculo'].value),
      parteCuerpo_id: parseInt(this.ejerciciosForm.controls['parteCuerpo'].value),
      urlGif : this.ejerciciosForm.controls['url'].value
    };
    this.ejerciciosService.editExercise(ejercicioData2, id).subscribe({
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
/**
   * Método para Borrar ejercicios
   *
   * @params
   * @return mensaje de confirmacion
   */
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
/**
   * Método para listar ejercicios
   *
   * @params
   * @return lista de ejercicios
   */
  public listar(){
    this.ejerciciosService.listExercises().subscribe({
      next: res => {
        this.listaEjercicios = res;
      }
    });
  }
  /**
   * Método para abrir el modal modificado de acuerdo si es añadir o editar
   *
   * @params id del ejercicio para guardarlo
   * @return Mensajes del modal modificados
   */
  public abrirModal(id: number){
    this.exerciseId = id;
    this.visible = true;
    if(id === 0){
      this.ejerciciosForm.reset();
      this.header = 'Añadir nuevo ejercicio';
    }else{
      this.ejerciciosService.listExercisesById(this.exerciseId).subscribe({
        next: (res) =>{
          if (res != null) this.ejercicios = res;
          this.ejerciciosForm.get('descripcion')?.setValue(this.ejercicios?.descripcion);
          this.ejerciciosForm.get('musculo')?.setValue(this.ejercicios?.musculoObjetivo_id.id);
          this.ejerciciosForm.get('parteCuerpo')?.setValue(this.ejercicios?.parteCuerpo_id.id);
          this.ejerciciosForm.get('url')?.setValue(this.ejercicios?.urlGif);
        }
      });
      this.header = 'Editar ejercicio';
    }
  }
  /**
   * Método para editar el método de acuerdo si hay id de ejercicio o no
   *
   * @params
   * @return Método para el ngSubmit
   */
  public enviarModal(){
    this.visible = true;
    if(this.exerciseId === 0){
      this.registrar();
    }else{
      this.editar();
    }
  }
}
