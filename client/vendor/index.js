const { io } = require('socket.io-client')
const Chance = require('chance')
const createHandleReceived = require('./handleReceived/index')
const needPickup = require('./needPickup/index')

const chance = new Chance()
const socket = io('http://localhost:3001/caps')
const pickup = needPickup(socket)
const handleReceived = createHandleReceived(socket)

socket.on('DELIVERED', handleReceived)

setInterval(() => {

    const payload = {
        "store": chance.word(),
        "orderID": chance.guid(),
        "customer": chance.name(),
        "address": chance.address()
    }

    pickup(payload)
}, 3000)