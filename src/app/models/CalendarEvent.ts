import { Duration } from "./Duration";

export class CalendarEvent {
    id: string;
    created: string;
    updated: string;
    summary: string;
    description: string;
    start: Duration;
    end: Duration;
  
    constructor(object: any) {
        this.id = object.id;
        this.created = object.created;
        this.updated = object.updated;
        this.summary = object.summary;
        this.description = object.description;
        this.start = new Duration(object.start);
        this.end = new Duration(object.end);
    }
}