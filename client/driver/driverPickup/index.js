module.exports = (socket) => (payload) => {
    console.log('DRIVER: picked up and in transit for ', payload.orderID)
    socket.emit('PICKED-UP', payload)
}