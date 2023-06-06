import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrenadores',
  templateUrl: './entrenadores.component.html',
  styleUrls: ['./entrenadores.component.css']
})
export class EntrenadoresComponent {

  public triggerModal = false;
  public nameUserByFilter = '';
  public controlEditOrCreateUser = 0;
  public filteredUser: [] = [];

  public trainers :any = [
    {
      nombre : "Julian Camilo",
      correo : "johndoe@ufps.edu.co",
    },
    {
      nombre : "Angel Yesid",
      correo : "johndoe@ufps.edu.co",
    },
    {
      nombre : "Javier Andres",
      correo : "johndoe@ufps.edu.co",
    },
    {
      nombre : "Gerson Israel",
      correo : "johndoe@ufps.edu.co",
    },
  ]

  public registerForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private _fb: FormBuilder,
  ) {}

  /**
   * Método para borrar a un entrenador mediante el correo
   *
   * @params Correo del entrenador a borrar traído de la vista
   * @return recarga la lista con el entrenador eliminado
   */
  public deleteAttendant(email: string) {
    // Mini modal de confirmacion
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
      }
    });
  }

/**
   * Método para registar a un entrenador mediante el correo
   *
   * @params Correo y contraseña del entrenador a registrar traído de la vista
   * @return recarga la lista con el entrenador registrado
   */
public saveUser() {
  // Traemos los parámetros de la vista
  const email = this.registerForm.get('email')?.value;
  const password = this.registerForm.get('password')?.value;
  // Mini modal de confirmación de creación
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
    // Mandamos los parámetros al back para registrar entrenador

    // Una vez registrado cerramos el modal
    this.triggerModal = false;
  });
}

/**
   * Método para buscar a un entrenador
   *
   * @params Correo del entrenador a buscar
   * @return El entrenador solicitado
   */
public findUser() {
  // El buscador para ubicar por el email

}
}
