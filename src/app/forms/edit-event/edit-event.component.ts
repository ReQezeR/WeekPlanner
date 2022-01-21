import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent, Duration } from '@app/models';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
  @Input() event!: CalendarEvent;

  form!: FormGroup;

  eventUpdated!: CalendarEvent;

  isEventDataUpdated: boolean = false;
  isValid: boolean = false;
  submitted:boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.resetData();
  }

  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      this.eventUpdated.summary = val.summary;
      this.eventUpdated.start = new Duration({'time': val.start});
      this.eventUpdated.end = new Duration({'time':val.end});
      this.eventUpdated.description = val.description;
      if(!(JSON.stringify(this.event) === JSON.stringify(this.eventUpdated))){
        this.isEventDataUpdated = true;
      }
      else{
        this.isEventDataUpdated = false;
      }

      if(!this.form.valid) {
        this.isValid = false;
      }
      else{
        if(this.compareTime()){
          this.isValid = true;
        }
        else{
          this.isValid = false;
        }
      }
    });
  }

  resetData(){
    this.eventUpdated = new CalendarEvent({});
    this.eventUpdated.id = this.event.id;
    this.eventUpdated.summary = this.event.summary;
    this.eventUpdated.description = this.event.description;
    this.eventUpdated.start = this.event.start;
    this.eventUpdated.end = this.event.end;
    this.eventUpdated.isGoogle = this.event.isGoogle;


    this.form = this.formBuilder.group({
      summary: [this.eventUpdated.summary, Validators.required],
      description: [this.eventUpdated.description, Validators.required],
      start: [this.eventUpdated.start.time, Validators.required],
      end: [this.eventUpdated.end.time, Validators.required]
    });
    this.onChanges();
  }


  compareTime(){
    let t1,t2;
    let v1, v2;
    t1 = this.eventUpdated.start.time;
    t2 = this.eventUpdated.end.time;
    v1 = Number(t1.split(':')[0])*60+Number(t1.split(':')[1]);
    v2 = Number(t2.split(':')[0])*60+Number(t2.split(':')[1]);
    if(v1<=v2){
      return true;
    }
    else if(v1>v2&& v2==0){
      return true;
    }
    else{
      return false;
    }
  }
}
