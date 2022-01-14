import { Calendar } from "./Calendar";

export class CalendarList {
    items: Calendar[]
    count: number;
    constructor(object: any) {
        this.items = [];
        object?.items?.forEach((obj:string) => { this.items.push(new Calendar(obj)); })||[];
        this.count = this.items.length||0;
    }
}