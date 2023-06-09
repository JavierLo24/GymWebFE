import { Component, OnInit } from '@angular/core';
import { Planes } from 'src/app/data/interfaces/Planes.interface';
import { PlanService } from '../../services/plan.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css'],
})
export class PlanesComponent implements OnInit {

  planes: Planes[] = [];

  public planForm: FormGroup = this._fb.group({
    nombre: ['', [Validators.required], ],
    descripcion: ['', [Validators.required], ],
    precio: ['', [Validators.required], ],
  })

  ocultar = false;
  id = -1;

  ngOnInit(): void {
    this.getPlanes();
  }

  constructor(
    private _planesService: PlanService,
    private _fb: FormBuilder
    ) {}

  /**
   * Método para listar a todos los usuarios PERSONAL/AUXILIARES que trae el servicio
   *
   * @params
   * @return un listado con los usuarios PERSONAL/AUXILIARES
   */
  getPlanes(): void {
    this._planesService.listPlanes().subscribe((planes) => {
      this.planes = [...planes];
    });
  }

  /**
   * Método para editar los planes
   *
   * @params id del plan, nombre, descripcion y precio
   * @return
   */
  public editPlan() {
    this.ocultar = true;
    const idPlan = this.id;
    const nombre = this.planForm.get('nombre')?.value;
    const descripcion = this.planForm.get('descripcion')?.value;
    const precio = this.planForm.get('precio')?.value;
    this._planesService.editPlan(idPlan, nombre, descripcion, precio).subscribe({
      next: ok => {
        Swal.fire({
        title: 'Plan editado correctamente',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isDenied || result.dismiss) {
          return;
        }
        this.ocultar = false;
        this.getPlanes();
      });
      }, error: err =>{

      }
    });
  }

  public modal(id:any){
    this.id = id;
    this.ocultar = !this.ocultar
    return this.ocultar;
  }



}
