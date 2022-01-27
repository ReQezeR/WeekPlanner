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
  indexes: any = JSON.parse('{"monday": 0,"tuesday": 1,"wednesday": 2,"thursday": 3,"friday":4,"saturday": 5,"sunday": 6}');

  constructor() {
    let localData = localStorage.getItem('calendar-data');
    if(localData!=null){
      let data = JSON.parse(localData)
      for(let d of data){
        let events = [];
        for(let e of d.events){
          events.push(new CalendarEvent(e))
        }
        d.events = events;
      }
      this.dataSubject = new BehaviorSubject<any>(data);
    }
    else{
      this.dataSubject = new BehaviorSubject<any>([
        {id: "monday", name: "Poniedziałek", events: [] as any},
        {id: "tuesday", name: "Wtorek", events: [] as any},
        {id: "wednesday", name: "Środa", events: [] as any},
        {id: "thursday", name: "Czwartek", events: [] as any},
        {id: "friday", name: "Piątek", events: [] as any},
        {id: "saturday", name: "Sobota", events: [] as any},
        {id: "sunday", name: "Niedziela", events: [] as any}
      ]);
    }
    
    this.dataObservable = this.dataSubject.asObservable();
  }

  addEvent(day: Day, event: CalendarEvent) {
    event.id = Date.now().toString();
    this.dataSubject.getValue()[this.indexes[day]].events.push(event)
    this.updateEvents(this.dataSubject.getValue());
  }

  addEvents(day: Day, events: CalendarEvent) {
    for(let event in events){
      this.dataSubject.getValue()[this.indexes[day]].events.push(event);
    }
    this.updateEvents(this.dataSubject.getValue());
  }

  editEvent(day: Day, event: CalendarEvent){
    console.log(event);
    let index = this.dataSubject.getValue()[this.indexes[day]].events.findIndex((element: CalendarEvent)=> element.id === event.id)
    this.dataSubject.getValue()[this.indexes[day]].events[index] = event;
    this.updateEvents(this.dataSubject.getValue());
  }

  removeEvent(day: Day, event: CalendarEvent) {
    this.dataSubject.getValue()[this.indexes[day]].events = this.dataSubject.getValue()[this.indexes[day]].events.filter((x:CalendarEvent) => event.summary != x.summary)
    this.updateEvents(this.dataSubject.getValue());
  }

  getEvents(day: Day) {
    return this.dataSubject.getValue()[this.indexes[day]].events;
  }

  resetEvents(){
    this.updateEvents([
      {id: "monday", name: "Poniedziałek", events: [] as any},
      {id: "tuesday", name: "Wtorek", events: [] as any},
      {id: "wednesday", name: "Środa", events: [] as any},
      {id: "thursday", name: "Czwartek", events: [] as any},
      {id: "friday", name: "Piątek", events: [] as any},
      {id: "saturday", name: "Sobota", events: [] as any},
      {id: "sunday", name: "Niedziela", events: [] as any}
    ]);
  }

  updateEvents(data: any){
    localStorage.setItem('calendar-data', JSON.stringify(data));
    this.dataSubject.next(data);
  }
}
