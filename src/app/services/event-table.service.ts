import { Injectable } from '@angular/core';
import { Day } from '@app/enums/day';
import { CalendarEvent } from '@app/models';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventTableService {
  private dataSubject: BehaviorSubject<any>;
  public dataObservable: Observable<any>;

  constructor() {
    let localData = localStorage.getItem('calendar-data');
    if(localData!=null){
      this.dataSubject = new BehaviorSubject<any>(JSON.parse(localData));
    }
    else{
      this.dataSubject = new BehaviorSubject<any>({
        "monday": [] as any,
        "tuesday": [] as any,
        "wednesday": [] as any,
        "thursday": [] as any,
        "friday": [] as any,
        "saturday": [] as any,
        "sunday": [] as any,
      });
    }
    
    this.dataObservable = this.dataSubject.asObservable();
  }

  addEvent(day: Day, event: CalendarEvent) {
    this.dataSubject.getValue()[day].push(event)
    this.updateEvents(this.dataSubject.getValue());
  }

  addEvents(day: Day, events: CalendarEvent) {
    for(let event in events){
      this.dataSubject.getValue()[day].push(event);
    }
    this.updateEvents(this.dataSubject.getValue());
  }

  removeEvent(day: Day, event: CalendarEvent) {
    // this.weekData[day].filter((x:CalendarEvent) => event.id != x.id);//TODO: checkme
    this.dataSubject.next(this.dataSubject.getValue()[day].filter((x:CalendarEvent) => event.id != x.id));
  }

  getEvents(day: Day) {
    return this.dataSubject.getValue()[day];
  }

  resetEvents(){
    this.updateEvents({
      "monday": [] as any,
      "tuesday": [] as any,
      "wednesday": [] as any,
      "thursday": [] as any,
      "friday": [] as any,
      "saturday": [] as any,
      "sunday": [] as any,
    });
  }

  updateEvents(data: any){
    localStorage.setItem('calendar-data', JSON.stringify(data));
    this.dataSubject.next(data);
  }
}
