# lighting-simulator
Home automation lighting simulator project.

# setup
run `npm install` and `bower install` in order to get this project working.

## running
debug mode: `DEBUG=lighting-simulator:* npm start`
normal mode: `npm start`

## interaction with curl

#### setting bulb count (modify bulbCount):
`curl -H "Content-Type: application/json" -X POST -d '{"type":"setBulbCount","bulbCount":"11"}' http://localhost:3000/`

#### turning bulb off (modify bulbId):
`curl -H "Content-Type: application/json" -X POST -d '{"type":"operationRequest","bulbId":"0","cmd":"turnBulbOff"}' http://localhost:3000/operation`

#### turning bulb on (modify bulbId):
`curl -H "Content-Type: application/json" -X POST -d '{"type":"operationRequest","bulbId":"0","cmd":"turnBulbOn"}' http://localhost:3000/operation`
