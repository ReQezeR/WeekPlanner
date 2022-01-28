import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login'

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  }),
  observe: 'response' as const
};

const API_KEY = '439277693992-6ob74ji1krbv7scbv5up2e0pupmgap0l.apps.googleusercontent.com'

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  
  constructor(private http: HttpClient, private socialAuthService: SocialAuthService) {

  }

  //users/me/calendarList
  fetchCalendars(){
    let http_options = this.appendToken();
    return this.http.get<any>('/google-api/users/me/calendarList', http_options).pipe(map(data => {
      console.log("fetchCalendars status code:", data.status);
      console.log(data);
      return data;
    }));
  }

  fetchCalendar(calendarId: string){
    let http_options = this.appendToken();
    return this.http.get<any>('/google-api/users/me/calendarList/'+encodeURIComponent(calendarId), http_options).pipe(map(data => {
      console.log("fetchCalendar status code:", data.status);
      console.log(data);
      return data;
    }));
  }


  fetchCalendarEvents(calendarId: string){
    let http_options = this.appendToken();
    return this.http.get<any>('/google-api/calendars/'+encodeURIComponent(calendarId)+'/events', http_options).pipe(map(data => {
      console.log("fetchCalendarEvents status code:", data.status);
      console.log(data);
      return data;
    }));
  }

  fetchEvent(calendarId: string, eventId: string){
    let http_options = this.appendToken();
    return this.http.get<any>('/google-api/calendars/'+encodeURIComponent(calendarId)+'/events/'+encodeURIComponent(eventId), http_options).pipe(map(data => {
      console.log("fetchEvent status code:", data.status);
      console.log(data);
      return data;
    }));
  }



  appendToken(){
    let http_options = {
      'headers':{
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': 'Bearer'
      }
    };
    this.socialAuthService.authState.subscribe(
      (data: SocialUser)=>{ http_options['headers']['Authorization']='Bearer '+data.authToken;} 
    );
    return http_options;
  }
}
