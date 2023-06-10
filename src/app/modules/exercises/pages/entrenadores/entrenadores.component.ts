import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/data/interfaces/Usuarios.interface';
import Swal from 'sweetalert2';
import { TrainerService } from '../../services/trainer.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-entrenadores',
  templateUrl: './entrenadores.component.html',
  styleUrls: ['./entrenadores.component.css'],
})
export class EntrenadoresComponent implements OnInit{
  public triggerModal = false;
  public nameUserByFilter = '';
  public controlEditOrCreateUser = 0;
  public filteredUser: [] = [];
  public visible: boolean = false;
  public trainers: Usuario[] = [];

  public registerForm: FormGroup = this._fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private _fb: FormBuilder,
    private _trainerService: TrainerService
    ) {}

    ngOnInit(): void {
      this.getTrainers();
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

  /**
   * Método para listar a todos los usuarios ENTRENADORES que trae el servicio
   *
   * @params
   * @return un listado con los usuarios ENTRENADORES
   */
  getTrainers(): void {
    this._trainerService.listTrainers().subscribe((trainer) => {
      this.trainers = [...trainer];
    });
  }

  /**
   * Método para borrar a un entrenador mediante el correo
   *
   * @params Correo del entrenador a borrar traído de la vista
   * @return recarga la lista con el entrenador eliminado
   */
  public deleteTrainers(email: string) {
    Swal.fire({
      title: '¿Estás seguro de que desea eliminar al usuario seleccionado?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._trainerService.deleteTrainers(email).subscribe((users) => {
          Swal.fire({
            title: 'Plan editado correctamente',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          })
          this.getTrainers();
        });
      }
    });
  }

  /**
   * Método para registar a un usuario PERSONAL/AUXILIARES mediante el correo
   *
   * @params Correo y contraseña del usuario AUXILIAR a registrar traído de la vista
   * @return recarga la lista con el usuario AUXILIAR registrado
   */
  public saveTrainer() {
    const nombre = this.registerForm.get('nombre')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    Swal.fire({
      title: `¿Estás seguro de que desea crear al usuario?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Agregar',
    }).then((result) => {
      if (result.isDenied || result.isDismissed) return;
      this._trainerService.registerTrainer(nombre, email, password).subscribe({
       next: (res: unknown) => {
          this.getTrainers();
          Swal.fire('¡Felicidades!', '¡Te has registrado con éxito!', 'success');
        },
       error: (err: unknown) => {
          Swal.fire('¡Error!', 'Correo ya registrado anteriormente', 'error');
        }
      });
      this.triggerModal = false;
    });
  }

}
