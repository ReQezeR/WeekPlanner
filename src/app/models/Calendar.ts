export class Calendar {
    id: string;
    summary: string;
    description: string;
    backgroundColor: string;
    foregroundColor: string;
  
    constructor(object: any) {
        this.id = object?.id||"";
        this.summary = object?.summary||"";
        this.description = object?.description||"";
        this.backgroundColor = object?.backgroundColor||"";
        this.foregroundColor = object?.foregroundColor||"";
    }
}