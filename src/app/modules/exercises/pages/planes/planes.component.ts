import { Component, OnInit } from '@angular/core';
import { Planes } from 'src/app/data/interfaces/Planes.interface';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit{


  planes: Planes[] = [];

  ngOnInit(): void {
    this.getPlanes();
  }

  constructor(
    private _planesService: PlanService
  ){}


/**
   * Método para listar a todos los usuarios PERSONAL/AUXILIARES que trae el servicio
   *
   * @params
   * @return un listado con los usuarios PERSONAL/AUXILIARES
   */
getPlanes(): void {
  this._planesService.listPlanes().subscribe((planes) => {
    this.planes = [...planes];
    //this.filteredUser = [...users];
  });
}
}
