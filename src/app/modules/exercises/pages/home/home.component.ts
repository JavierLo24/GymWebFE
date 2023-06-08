import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  public customers :any = [
    {
      nombre : "Julian Camilo",
      apellido : "Riveros Fonseca",
      plan : "Plan Pobre",
      fechaInit : "03/06/2023",
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

  constructor(
    private plan: PlanService
  ){}

  ngOnInit(): void {
   
  }

  public clear(table: Table){
    table.clear()
  }

  public filtrar(event:any, table:Table){
    table.filterGlobal(event.target.value, 'contains');
  }
}
