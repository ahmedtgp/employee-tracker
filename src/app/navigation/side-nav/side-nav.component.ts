import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user.model';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Output() closeSidenav  = new EventEmitter<void>();
  isAuth$: Observable<User>;

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.isAuth$ = this.authService.currentUser;
  }
  onClose() {
    this.closeSidenav.emit();
  }
  onLogout() {
    this.authService.logout();
    this.closeSidenav.emit();
    this.router.navigate(['/login']);
  }
}
