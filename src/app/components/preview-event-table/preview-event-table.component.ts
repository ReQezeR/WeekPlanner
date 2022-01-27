import { Component, OnInit } from '@angular/core';
import { EventTableService } from '@app/services/event-table.service';

@Component({
  selector: 'app-preview-event-table',
  templateUrl: './preview-event-table.component.html',
  styleUrls: ['./preview-event-table.component.scss']
})
export class PreviewEventTableComponent implements OnInit {
  weekData: any;

  constructor(private eventTableService: EventTableService) { 
    this.eventTableService.dataObservable.subscribe(observableData => {
      this.weekData = observableData;
    });
  }

  ngOnInit(): void {
  }

}
