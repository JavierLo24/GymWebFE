import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public customers :any = [
    {
      nombre : "Julian Camilo",
      apellido : "Riveros Fonseca",
      plan : "Plan Pobre",
      fechaInit : "02/06/2023",
    },
    {
      nombre : "Angel Yesid",
      apellido : "Duque Cruz",
      plan : "Plan Noob",
      fechaInit : "02/06/2023",
    },
    {
      nombre : "Javier Andres",
      apellido : "Lopez Ortega",
      plan : "Plan Pro",
      fechaInit : "02/06/2023",
    },
    {
      nombre : "Gerson Israel",
      apellido : "Diaz de la garza",
      plan : "Plan Pobre",
      fechaInit : "02/06/2023",
    },
  ]
}
