import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor (private authService: AuthService){}

  logout() {
    this.authService.logout();
    window.location.reload();
  }
  getAdmin(){
    return this.authService.getAdminId();
  }
}
