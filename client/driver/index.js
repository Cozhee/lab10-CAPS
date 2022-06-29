const { io } = require('socket.io-client')
const createDelivery = require('./delivery/index')
const createDriverPickup = require('./driverPickup/index')
const createPackageDelivered = require('./packageDelivered/index')

const socket = io('http://localhost:3001/caps')

const delivery = createDelivery(socket)
const driverPickup = createDriverPickup(socket)
const packageDelivered = createPackageDelivered(socket)

socket.on('PICK-UP', delivery)
socket.on('DELIVERY-NEEDED', driverPickup)
socket.on('PICKED-UP', packageDelivered)