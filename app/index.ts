import {TiltClient} from './tiltclient'
import { TiltReading } from './models';

const tiltClient = new TiltClient();
tiltClient.initialize();

tiltClient.on("NewReading", (reading: TiltReading) => {
    console.log(JSON.stringify(reading));
})
