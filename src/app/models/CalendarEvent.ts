import { Duration } from "./Duration";
import { EventIcon } from "./EventIcon";

export class CalendarEvent {
    id: string;
    created: string;
    updated: string;
    summary: string;
    description: string;
    start: Duration;
    end: Duration;
    isGoogle: boolean;

    icon: EventIcon;
  
    constructor(object: any, isGoogle?: boolean) {
        this.id = object.id;
        this.created = object.created;
        this.updated = object.updated;
        this.summary = object.summary;
        this.description = object.description;
        this.start = new Duration(object.start);
        this.end = new Duration(object.end);
        this.isGoogle = isGoogle||false;
        this.icon = new EventIcon(object.icon);
    }
}