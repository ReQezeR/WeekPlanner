import { Component, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { MatTableDataSource } from '@angular/material/table';

import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login'
import { GoogleCalendarService } from './services/google-calendar.service';
import { CalendarList } from './models/CalendarList';
import { AuthService } from './services/auth.service';

const USERS = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "email": "sincere@april.biz",
    "phone": "1-770-736-8031 x56442"
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "email": "shanna@melissa.tv",
    "phone": "010-692-6593 x09125"
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "email": "nathan@yesenia.net",
    "phone": "1-463-123-4447",
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "email": "julianne@kory.org",
    "phone": "493-170-9623 x156"
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich",
    "email": "lucio@annie.ca",
    "phone": "(254)954-1289"
  },
  {
    "id": 6,
    "name": "Mrs. Dennis",
    "email": "karley@jasper.info",
    "phone": "1-477-935-8478 x6430"
  }
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: SocialUser|null;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone'];
  dataSource = USERS;

  title = 'WeekPlanner';

  //==============================
  isLoggedin!: boolean;
  //==============================

  data: CalendarList = new CalendarList({});

  constructor(
    private googleService: GoogleCalendarService,
    private authService: AuthService
  ){
    this.user = null;
  }

  ngOnInit() {
    this.authService.userObservable.subscribe(user => {
      this.user = user;
    });
  }

  printUser(){
    console.log(this.user);
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

  toJSON(data: any){
    return JSON.stringify(data);
  }

  public openPDF():void {
    let DATA = document.getElementById('htmlData');
        
    html2canvas(DATA!).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('l', 'mm', 'a4');

        var width = PDF.internal.pageSize.getWidth();
        var height = PDF.internal.pageSize.getHeight();

        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, width, height)
        
        PDF.save('angular-demo.pdf');
    });     
    }
}
