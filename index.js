const eventPool = require('./eventPool')
const delivery = require('./handlers/delivery')
const driverPickup = require('./handlers/driverPickup')
const packageDelivered = require('./handlers/packageDelivered')
const notifyVendor = require('./handlers/notifyVendor')
const vendorPickup = require('./handlers/vendorPickup')
const globalPool = require('./globalPool') // needed apparently even though unused
const chance = require('./chance')


eventPool.on('VENDOR PICKUP', vendorPickup)
eventPool.on('DELIVERY NEEDED', delivery)
eventPool.on('DRIVER PICKUP', driverPickup)
eventPool.on('DELIVERED', packageDelivered)
eventPool.on('NOTIFY VENDOR', notifyVendor)


setInterval(() => {

    const payload = {
        "store": chance.word(),
        "orderID": chance.guid(),
        "customer": chance.name(),
        "address": chance.address()
    }

    eventPool.emit('VENDOR PICKUP', {payload, name: 'VENDOR PICKUP'})
}, 3000)

