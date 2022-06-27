const eventPool = require('../eventPool')

module.exports = ({payload, name}) => {
    console.log('DRIVER: picked up ', payload.orderID)
    eventPool.emit('DELIVERED', {payload, name: 'DELIVERED'})
}