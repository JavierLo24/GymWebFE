import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dash-navbar',
  templateUrl: './dash-navbar.component.html',
  styleUrls: ['./dash-navbar.component.css']
})
export class DashNavbarComponent {

  @Output() close = new EventEmitter<boolean>();
  private flagClose = false;


  public closeNav() {
    this.flagClose = !this.flagClose;
    this.close.emit(this.flagClose);
  }
}
