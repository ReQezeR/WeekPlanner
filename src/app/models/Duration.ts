export class Duration {
    date: string;
    time: string;
    dateTime: string;
    timeZone: string;
    constructor(object: any, isEnd?: boolean) {
        this.date = object?.date||"";
        this.time = object?.time||"";
        this.dateTime = object?.dateTime||"";
        this.timeZone = object?.timeZone||"";
        if(isEnd!=null){
            if(isEnd==true){
                if(this.time==null || this.time==""){
                    this.time = "23:59"
                }
            }
            else{
                if(this.time==null || this.time==""){
                    this.time = "00:00"
                }
            }
        }
    }

    getDate(){
        if(this.dateTime.length>0){
            const dividedDate = this.dateTime.split("T");
            return dividedDate[0];
        }
        else if(this.date.length>0){
            return this.date;
        }
        else{
            return "unknown"
        }
    }

    getTime(){
        if(this.dateTime.length>0){
            const dividedDate = this.dateTime.split("T");
            return dividedDate[1].split(".")[0];
        }
        else if(this.time.length>0){
            return this.time;
        }
        else{
            return "unknown"
        }
    }
}