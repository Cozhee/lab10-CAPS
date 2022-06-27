'use strict';

const eventPool = require('../eventPool')
const vendorPickup = require('../handlers/vendorPickup')
const delivery = require('../handlers/delivery')
const driverPickup = require('../handlers/driverPickup')
const packageDelivered = require('../handlers/packageDelivered')
const notifyVendor = require('../handlers/notifyVendor')
const chance = require("../chance");


jest.mock('../eventPool.js', () => {
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

    test('vendor pickup', () => {

        vendorPickup({payload, name: "VENDOR PICKUP"});
        expect(console.log).toHaveBeenCalledWith('VENDOR: need order picked up from DRIVER', payload.orderID);
        expect(eventPool.emit).toHaveBeenCalledWith('DELIVERY NEEDED', {payload, name: 'DELIVERY NEEDED'});
    });

    test('delivery', () => {
        delivery({payload, name: 'DELIVERY NEEDED'})
        expect(console.log).toHaveBeenCalledWith(`DRIVER: need delivery for`, payload.orderID);
        expect(eventPool.emit).toHaveBeenCalledWith('DRIVER PICKUP', {payload, name: 'DRIVER PICKUP'});

    })

    test('driver pickup', () => {
        driverPickup({payload, name: 'DRIVER PICKUP'})
        expect(console.log).toHaveBeenCalledWith('DRIVER: picked up ', payload.orderID);
        expect(eventPool.emit).toHaveBeenCalledWith('DELIVERED', {payload, name: 'DELIVERED'})
    })

    test('delivered', () => {
        packageDelivered({payload, name: 'DELIVERED'})
        expect(console.log).toHaveBeenCalledWith('DRIVER: delivered ', payload.orderID);
        expect(eventPool.emit).toHaveBeenCalledWith('NOTIFY VENDOR', {payload, name: "NOTIFY VENDOR"})
    })

    test('notify vendor', () => {
        notifyVendor({payload, name: "NOTIFY VENDOR"})
        expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivering', payload.orderID);
    })

});