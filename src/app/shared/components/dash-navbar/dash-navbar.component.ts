import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-dash-navbar',
  templateUrl: './dash-navbar.component.html',
  styleUrls: ['./dash-navbar.component.css']
})
export class DashNavbarComponent {

  @Output() close = new EventEmitter<boolean>();
  private flagClose = false;

  constructor(
    private _authService: AuthService,
  ){}

  public closeNav() {
    this.flagClose = !this.flagClose;
    this.close.emit(this.flagClose);
  }

  public logout() {
    this._authService.logout();
  }
}
