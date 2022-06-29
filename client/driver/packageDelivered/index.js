module.exports = (socket) => (payload) => {
    console.log('DRIVER: delivered package', payload.orderID)
    socket.emit('DELIVERED', payload)
}