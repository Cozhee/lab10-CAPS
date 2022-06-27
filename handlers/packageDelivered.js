const eventPool = require('../eventPool')

module.exports = ({payload, name}) => {
    console.log('DRIVER: delivered ', payload.orderID)
    eventPool.emit('NOTIFY VENDOR', {payload, name: "NOTIFY VENDOR"})
}