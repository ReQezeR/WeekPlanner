export class EventIcon {
    name: string;
    color: string;
    constructor(object: any) {
        this.name = object?.name||"event_note";
        this.color = object?.color||"seagreen";
    }
}