import * as bleacon from 'bleacon';
import * as mqtt from 'mqtt';

const MQTT_ADDRESS = process.env.MQTT_ADDRESS;

if(!MQTT_ADDRESS) throw new Error("No mqtt address provided")

const client = mqtt.connect(MQTT_ADDRESS);

const tilts = {
    "a495bb10c5b14b44b5121370f02d74de": "Red",
    "a495bb20c5b14b44b5121370f02d74de": "Green",
    "a495bb30c5b14b44b5121370f02d74de": "Black",
    "a495bb40c5b14b44b5121370f02d74de": "Purple",
    "a495bb50c5b14b44b5121370f02d74de": "Orange",
    "a495bb60c5b14b44b5121370f02d74de": "Blue",
    "a495bb70c5b14b44b5121370f02d74de": "Pink"
}

// temperature
const toCelcius = function (farenheit:number): number { return (farenheit - 32) * 5 / 9 };

// gravity
const toPlato = function (sg:number): number { return ((135.997 * sg - 630.272) * sg + 1111.14) * sg - 616.868 };
const toBrix = function (sg:number):number { return ((182.4601 * sg - 775.6821) * sg + 1262.7794) * sg - 669.5622 };

function buildPayload(bleacon){
    const sg = bleacon.minor/1000;
    var payload = {
        "temperature":{ 
            "c": toCelcius(bleacon.major), 
            "f": bleacon.major
        },
        "gravity": { 
            "sg": sg, 
            "plato": toPlato(sg),
            "brix": toBrix(sg)
        }
    };
    return payload;
}

bleacon.on('discover', (bleacon) => {
    if(tilts[bleacon.uuid] != null){
        const tiltName = tilts[bleacon.uuid];
        const payload = JSON.stringify(buildPayload(bleacon))
        client.publish(`tele/TILT-${tiltName}/SENSOR`, payload);
    }
})

bleacon.startScanning();
