module.exports = (socket) => (payload) => {
    console.log('VENDOR: need pick up for', payload.orderID)
    socket.emit('PICK-UP', payload)
}