'use strict'

const { Server } = require('socket.io')

const PORT = process.env.PORT || 3001;

const server = new Server(PORT);

const caps = server.of('/caps')

caps.on('connection', (socket) => {
    console.log('Socket connected to event server: ', socket.id)


    socket.on('PICK-UP', (payload) => {
        console.log('VENDOR needs pickup for', payload.orderID)
        socket.broadcast.emit('PICK-UP', payload)
        logEvent('PICK-UP', payload)
    })

    socket.on('DELIVERY-NEEDED', (payload) => {
        console.log(`Need a driver for delivery of `, payload.orderID)
        socket.emit('DELIVERY-NEEDED', payload)
        logEvent('DELIVERY-NEEDED', payload)
    })

    socket.on('PICKED-UP', (payload) => {
        console.log('DRIVER: picked up and in transit for ', payload.orderID)
        socket.emit('PICKED-UP', payload)
        logEvent('PICKED-UP', payload)
    })

    socket.on('DELIVERED', (payload) => {
        console.log('DRIVER: delivered package', payload.orderID)
        socket.broadcast.emit('DELIVERED', payload)
        logEvent('DELIVERED', payload)
    })

    socket.on('ORDER COMPLETE', (payload) => {
        console.log('ORDER COMPLETE for', payload.orderID)
        logEvent('ORDER COMPLETE', payload)
    })

})

function logEvent(event, payload) {
    let time = new Date().toLocaleString()
    console.log('EVENT', {event, time, payload})
}