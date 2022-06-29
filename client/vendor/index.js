const { io } = require('socket.io-client')
const Chance = require('chance')
const createHandleReceived = require('./handleReceived/index')
const needPickup = require('./needPickup/index')
const VendorClient = require('./lib/vendorClient')
const vendor = VendorClient('vendor')

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3001/caps'

const chance = new Chance()
const socket = io(SOCKET_URL)
const pickup = needPickup(socket)
const handleReceived = createHandleReceived(socket)

// socket.on('DELIVERED', handleReceived)
vendor.subscribe('DELIVERED', handleReceived)

setInterval(() => {

    const payload = {
        "store": chance.word(),
        "orderID": chance.guid(),
        "customer": chance.name(),
        "address": chance.address()
    }

    vendor.publish('PICK-UP', { vendorId: chance.guid(), ...payload })
    // pickup(payload)
}, 3000)