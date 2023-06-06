import { Component, Input, OnInit } from '@angular/core';
import { ISidebar } from 'src/app/interfaces/ISidebar.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  @Input() items!: ISidebar[];

  ngOnInit(): void {}
}
