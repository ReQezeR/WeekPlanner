import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private userSubject: BehaviorSubject<SocialUser|null>;
  public userObservable: Observable<SocialUser|null>;

  constructor(private socialAuthService: SocialAuthService) {
    let localUser = localStorage.getItem('user');
    if(localUser!=null){
      let user = JSON.parse(localUser)

      this.userSubject  = new BehaviorSubject<SocialUser|null>(user);
      this.userObservable = this.userSubject.asObservable();
    }
    else{
      this.userSubject = new BehaviorSubject<SocialUser|null>(null);
      this.userObservable = this.userSubject.asObservable();
    }
    this.userSubject = new BehaviorSubject<SocialUser|null>(null);
    this.userObservable = this.userSubject.asObservable();
  }

  login() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (data)=>{
        this.setUserData(data);
      },
      (error)=>{
        console.error(error);
      }  
    )
  }

  logout() {
    this.socialAuthService.signOut().then(
      ()=>{
        localStorage.removeItem('user');
        this.userSubject.next(null);
      }
    );
  }

  getUserData(){
    return this.socialAuthService.authState;
  }

  setUserData(user: SocialUser){
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }
}