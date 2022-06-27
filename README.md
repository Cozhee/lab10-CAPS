# lab10-CAPS

## Project: Lab10

### Authors: Cody Davis

### Problem Domain
Use event listeners to trigger when their event is emitteted. Log each event name and payload to know the status of the events. For this I built a mock of a vendor needing an order delivered and the driver carrying out those orders. All events are logged.

### Links and Resources
- [Github](https://github.com/Cozhee/lab10-CAPS/pulls)

### Setup

#### `.env` requirements (where applicable)
no env variables required


#### How to initialize/run your application (where applicable)
`npm install` to get the dependencies

#### How to use your library (where applicable)
N/A

#### Features / Routes

`eventPool.on('VENDOR PICKUP')`<br>
`eventPool.on('DELIVERY NEEDED')`
`eventPool.on('DRIVER PICKUP')`
`eventPool.on('DELIVERED')`
`eventPool.on('NOTIFY VENDOR')`


## UML
![Screen Shot 2022-06-27 at 4 43 35 PM](https://user-images.githubusercontent.com/55909913/176057012-73b0d3c2-f2fd-4140-bb59-302f7dc66ba7.png)
