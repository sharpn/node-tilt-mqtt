import * as bleacon from 'bleacon';
import {toBrix,toCelcius,toPlato} from './helpers'
import { tilts } from './tilts';
import { EventEmitter } from 'events';
import { Bleacon, TiltReading } from './models';

export class TiltClient extends EventEmitter{

    public initialize(){
        bleacon.on('discover', (bleacon:Bleacon) => {
            if(tilts[bleacon.uuid] != null){
                const payload = JSON.stringify(this.buildPayload(bleacon))
                this.emit("NewReading", payload)
            }
        })
        bleacon.startScanning();
    }

    private buildPayload(bleacon:Bleacon):TiltReading{
        const sg = bleacon.minor/1000;
        
        return {
            name: tilts[bleacon.uuid],
            temperature:{ 
                "c": toCelcius(bleacon.major), 
                "f": bleacon.major
            },
            gravity: { 
                "sg": sg, 
                "plato": toPlato(sg),
                "brix": toBrix(sg)
            }
        };
    }
}