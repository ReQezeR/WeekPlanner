import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Day } from '@app/enums/day';
import { EditEventComponent } from '@app/forms/edit-event/edit-event.component';
import { CalendarEvent } from '@app/models';
import { EventTableService } from '@app/services/event-table.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() event: CalendarEvent;
  @Input() day: string = Day.none;
  @Input() isPreview: boolean = false;

  constructor(private eventTableService: EventTableService, public dialog: MatDialog) { 
    this.event = new CalendarEvent({});
  }

  ngOnInit(): void {
    // console.log(this.event);
  }

  editEvent(){
    const dialogRef = this.dialog.open(EditEventComponent);
    let instance = dialogRef.componentInstance;
    instance.event = this.event;

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // console.log(`Dialog result:`+JSON.stringify(result));
        this.eventTableService.editEvent((<any>Day)[this.day], result);
      }
    });
  }

  deleteEvent(){
    console.log(this.day);
    console.log(this.event);
    this.eventTableService.removeEvent((<any>Day)[this.day], this.event);
  }

  toogleIsDetailed(){
    this.event.isDetailed = !this.event.isDetailed;
    this.eventTableService.editEvent((<any>Day)[this.day], this.event);
  }
}
