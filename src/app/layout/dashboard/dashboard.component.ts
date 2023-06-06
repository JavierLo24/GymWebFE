import { Component } from '@angular/core';
import { sidebarItems } from 'src/app/data/const/sideItems.const';
import { ISidebar } from 'src/app/interfaces/ISidebar.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  open: boolean = false
  items: ISidebar[] = sidebarItems;

  closeNav(event: boolean){
    this.open = event
  }
}
