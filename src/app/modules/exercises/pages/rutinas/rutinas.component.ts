import { Component, OnInit } from '@angular/core';
import { EjerciciosService } from '../../services/ejercicios.service';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit{

  public listaEjercicios: any = [];

  public listaEjerciciosRutinas: any = [];

  public visible = false;
  
  constructor(
    private ejerciciosService:  EjerciciosService,
  ) {}

  ngOnInit(): void {
    this.listar()
  }

  public listar(){
    this.ejerciciosService.listExercises().subscribe({
      next: res => {
        this.listaEjercicios = res;
      }
    });  
  }
}
