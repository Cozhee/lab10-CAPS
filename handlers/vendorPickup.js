const eventPool = require('../eventPool')

module.exports = ({payload, name}) => {
    console.log('VENDOR: need order picked up from DRIVER', payload.orderID)
    eventPool.emit('DELIVERY NEEDED', {payload, name: 'DELIVERY NEEDED'})
}