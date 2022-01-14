import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Day } from '@app/enums/day';
import { AddEventComponent } from '@app/forms/add-event/add-event.component';
import { CalendarEvent } from '@app/models';
import { EventTableService } from '@app/services/event-table.service';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent implements OnInit {
  weekData: any;

  constructor(private eventTableService: EventTableService, public dialog: MatDialog) { 
    this.eventTableService.dataObservable.subscribe(data => {
      this.weekData = data;
      console.log(this.weekData);
    });
  }

  ngOnInit(): void {
  }

  addEvent(day: string, event: CalendarEvent){
    this.eventTableService.addEvent((<any>Day)[day], event);
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.eventTableService.updateEvents(this.weekData);
  }

  openEventFormDialog(day: string) {
    const dialogRef = this.dialog.open(AddEventComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // console.log(`Dialog result:`+JSON.stringify(result));
        this.addEvent(day, result);
      }
    });
  }

}
