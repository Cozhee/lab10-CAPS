const eventPool = require('../eventPool')

module.exports = ({payload, name }) => {
    console.log(`DRIVER: need delivery for`, payload.orderID)
    eventPool.emit('DRIVER PICKUP', {payload, name: 'DRIVER PICKUP'})
}