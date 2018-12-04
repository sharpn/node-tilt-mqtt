FROM hypriot/rpi-node:8-onbuild as BUILD

COPY . /usr/build
WORKDIR /usr/build

RUN npm i && npm run build && npm prune --production

FROM hypriot/rpi-node:8-slim

RUN apt-get update && apt-get install -y bluetooth bluez libbluetooth-dev libudev-dev

COPY --from=BUILD /usr/build /usr/src/app
WORKDIR /usr/src/app

ENTRYPOINT ["node", "."]