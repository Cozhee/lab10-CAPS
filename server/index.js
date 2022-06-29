'use strict'

const { Server } = require('socket.io')
const Queue = require('./lib/queue')

const PORT = process.env.PORT || 3001;
const server = new Server(PORT);
const caps = server.of('/caps')

const messageQueue = new Queue()


caps.on('connection', (socket) => {
    console.log('Socket connected to event server: ', socket.id)

    socket.onAny((event, payload) => {
        let time = new Date();
        console.log('EVENT:', {event, time, payload});
    })

    socket.on('PICK-UP', (payload) => {
        let currentQueue = messageQueue.read(payload.queueId);
        if (!currentQueue){
            let queueKey = messageQueue.store(payload.queueId, new Queue());
            currentQueue = messageQueue.read(queueKey)
        }
        currentQueue.store(payload.driverId, payload);
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
        let currentQueue = messageQueue.read(payload.queueId);
        if(!currentQueue){
            throw new Error('no queue created for this message');
        }
        let message = currentQueue.remove(payload.driverId);
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