import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isTokenExpired()) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  onLogout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/home-page']);

  }
  title = 'Food App';
}
