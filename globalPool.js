const eventPool = require('./eventPool')

eventPool.on('DELIVERY NEEDED', globalEvent)
eventPool.on('DRIVER PICKUP', globalEvent)
eventPool.on('DELIVERED', globalEvent)
eventPool.on('NOTIFY VENDOR', globalEvent)
eventPool.on('VENDOR PICKUP', globalEvent)

const current = new Date()

function globalEvent({payload, name}) {

    const event = {
        "EVENT": {
            "event": name,
            "time": current.toLocaleString(),
            payload
        }
    }
    console.log(event)
}