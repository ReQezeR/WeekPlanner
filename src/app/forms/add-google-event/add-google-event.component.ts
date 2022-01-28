import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent, CalendarList } from '@app/models';
import { AuthService } from '@app/services/auth.service';
import { GoogleCalendarService } from '@app/services/google-calendar.service';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-add-google-event',
  templateUrl: './add-google-event.component.html',
  styleUrls: ['./add-google-event.component.scss']
})
export class AddGoogleEventComponent implements OnInit {

  user: SocialUser|null = null;

  data: CalendarList = new CalendarList({});

  events: CalendarEvent[] = [] as any;

  isFinished = false;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  pickedCalendarId: string | null = null;
  pickedEvent: CalendarEvent | null = null;

  constructor(private authService: AuthService, private googleService: GoogleCalendarService, private formBuilder: FormBuilder){
    
    this.firstFormGroup = this.formBuilder.group({
      pickCalendar: ['', Validators.required],
    });

    this.secondFormGroup = this.formBuilder.group({
      pickEvent: ['', Validators.required],
    });

    this.onChanges();
  }

  ngOnInit() {
    this.authService.userObservable.subscribe(user => {
      this.user = user;
      if(user){
        this.getData();
      }
    });
  }

  onChanges(): void {
    this.firstFormGroup.valueChanges.subscribe(val => {
      console.log(val.pickCalendar);
      this.pickedCalendarId = val.pickCalendar;
      if(this.pickedCalendarId){
        this.getCalendarEvents(this.pickedCalendarId);
      }
    });

    this.secondFormGroup.valueChanges.subscribe(val => {
      console.log(val.pickEvent);
      this.pickedEvent = new CalendarEvent(val.pickEvent, true, true);
      this.pickedEvent.icon.color="#3f51b5"
    });
  }

  login(): void {
    //google auth
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  getData(){
    this.googleService.fetchCalendars().subscribe(
      data => {
        this.data = new CalendarList(data);
        console.log(new CalendarList(data));
      },
      err => {
        console.log(err);
      }
    );
  }

  getCalendarEvents(calendarId: string){
    console.log(calendarId)
    this.googleService.fetchCalendarEvents(calendarId).subscribe(
      data => {
        this.events = [];
        for(let e of data.items){
          this.events.push(new CalendarEvent(e, e.isDetailed, e.isGoogle));
        }
        console.log(this.events);
      },
      err => {
        console.log(err);
      }
    );
  }

  toJSON(data: any){
    return JSON.stringify(data);
  }
}
