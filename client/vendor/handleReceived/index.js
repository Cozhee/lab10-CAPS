'use strict'

module.exports = (socket) => (payload) => {
    console.log('VENDOR: Thank you for delivering ', payload.orderID)
    socket.emit('ORDER COMPLETE', payload)
}