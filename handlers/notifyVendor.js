const eventPool = require('../eventPool')

module.exports = ({payload, name}) => {
    console.log('VENDOR: Thank you for delivering', payload.orderID)
}