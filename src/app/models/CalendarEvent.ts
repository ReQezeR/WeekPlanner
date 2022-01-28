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
    isDetailed: boolean;

    icon: EventIcon;
  
    constructor(object: any, isDetailed?:boolean, isGoogle?: boolean) {
        this.id = object.id;
        this.created = object.created;
        this.updated = object.updated;
        this.summary = object.summary;
        this.description = object.description?.split("\n")[0];
        this.start = new Duration(object.start, false);
        this.end = new Duration(object.end, true);
        if(object.isDetailed!=null){
            this.isDetailed = object.isDetailed;
        }else{
            this.isDetailed = isDetailed||true;
        }

        if(object.isGoogle!=null){
            this.isGoogle = object.isGoogle;
        }else{
            this.isGoogle = isGoogle||false;
        }

        
        this.icon = new EventIcon(object.icon);
    }
}