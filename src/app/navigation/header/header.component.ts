import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle  = new EventEmitter<void>();
  isAuth$: Observable<User>;

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.isAuth$ = this.authService.currentUser;
  }
  onSidenavToggle() {
    this.sidenavToggle.emit();
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
