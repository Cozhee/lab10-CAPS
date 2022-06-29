module.exports = (socket) => (payload) => {
    console.log(`Need a driver for delivery of `, payload.orderID)
    socket.emit('DELIVERY-NEEDED', payload)
}