import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: SocialUser|null = null;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userObservable.subscribe(user => {
      this.user = user;
    });
  }

  login(): void {
    //google auth
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
