const { io } = require('socket.io-client')
const createDelivery = require('./delivery/index')
const createDriverPickup = require('./driverPickup/index')
const createPackageDelivered = require('./packageDelivered/index')
const DriverClient = require('./lib/driverClient')
const driver = DriverClient('driver')

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3001/caps'

const socket = io(SOCKET_URL)

const delivery = createDelivery(socket)
const driverPickup = createDriverPickup(socket)
const packageDelivered = createPackageDelivered(socket)

driver.subscribe('PICK-UP', delivery)
driver.subscribe('DELIVERY-NEEDED', driverPickup)
driver.subscribe('PICKED-UP', packageDelivered)

// socket.on('PICK-UP', delivery)
// socket.on('DELIVERY-NEEDED', driverPickup)
// socket.on('PICKED-UP', packageDelivered)