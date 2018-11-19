# node-tilt-mqtt

## required

Raspberry pi with onboard bluetooth

## installation

- Run
    `sudo apt-get update && sudo apt-get -y upgrade`
- Install Nodejs 
    `sudo apt-get install -y nodejs`
- Run in the root of this directory
    `npm run build`
- Run
    `MQTT_ADDRESS=mqtt://<IP_ADDRESS_OF_MOSQUITTO> node .`

This software publishes all data onto the queue tele/TILT-<TILT_COLOUR>/SENSOR

TILT_COLOUR should be one of the following 
- Red
- Green
- Black
- Purple
- Orange
- Blue
- Pink
