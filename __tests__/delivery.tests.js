'use strict';

const { io } = require('socket.io-client')
const socket = io('http://localhost:3001/caps')

const needPickup = require('../client/vendor/needPickup/index')
const delivery = require('../client/driver/delivery/index')
const driverPickup = require('../client/driver/driverPickup/index')
const packageDelivered = require('../client/driver/packageDelivered/index')
const handleReceived = require('../client/vendor/handleReceived/index')

jest.mock('../server/index.js', () => {
    return {
        on: jest.fn(),
        emit: jest.fn(),
    }
});

const payload = {
    "store": "walmart",
    "orderID": 5,
    "customer": "Luke Walton",
    "address": "the corner"
}

describe('Tests', () => {

    console.log = jest.fn();

    test('vendor needs pickup', () => {

        needPickup(socket)(payload);
        expect(console.log).toHaveBeenCalledWith('VENDOR: need pick up for', payload.orderID);
        expect(socket.emit).toHaveBeenCalledWith('PICK-UP', payload);
    });

    test('delivery', () => {
        delivery(socket)(payload)
        expect(console.log).toHaveBeenCalledWith(`Need a driver for delivery of `, payload.orderID);
        expect(socket.emit).toHaveBeenCalledWith('DELIVERY-NEEDED', payload);

    })

    test('driver pickup', () => {
        driverPickup(socket)(payload)
        expect(console.log).toHaveBeenCalledWith('DRIVER: picked up and in transit for ', payload.orderID);
        expect(socket.emit).toHaveBeenCalledWith('PICKED-UP', payload)
    })

    test('delivered', () => {
        packageDelivered(socket)(payload)
        expect(console.log).toHaveBeenCalledWith('DRIVER: delivered package', payload.orderID);
        expect(socket.emit).toHaveBeenCalledWith('DELIVERED', payload)
    })

    test('notify vendor', () => {
        handleReceived(socket)(payload)
        expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivering ', payload.orderID);
    })

});