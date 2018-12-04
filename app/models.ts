export interface Bleacon{
    uuid:string;
    minor:number;
    major:number
}

export interface TiltReading{
    name:string;
    temperature:{
        c:number;
        f:number;
    },
    gravity:{
        sg:number;
        plato:number;
        brix:number
    }
}