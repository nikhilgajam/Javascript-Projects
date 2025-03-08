const express = require("express");
const os = require("os");
const app = express();
const { createQueue, createChannel } = require("./messenger");
const {v4: uuidv4} = require("uuid");



const replyToQueue=`abc${os.hostname()}:hello:${process.pid}`;
console.log("Creating queue", replyToQueue);
const eventQueue = "events_hello";

const responseMap = {};

app.use(function(req, res, next) {
    const {headers, body, url, query, method} = req;
    const routingKey = req.url.replaceAll('/', ' ').trim().replaceAll(" ", '-');
    const eventID = uuidv4();
    const payload = {headers,  body, url, query, method, replyToQueue, routingKey, eventName: routingKey, eventID};
    responseMap[eventID] = res;
    console.log("Response Map Size:", Object.keys(responseMap).length);
    console.log(">>>>", req.url)
    createChannel().then(channel => {
        // mongodb
        channel.publish("ex_hello", routingKey, Buffer.from(JSON.stringify(payload)), { replyTo: replyToQueue });
    });
});

const routingMap = {
    'product-hello': async (payload) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(JSON.stringify({ products: ['product 1', 'product 2'], eventID: payload.eventID, eventName: payload.eventName, replyToQueue }))
            }, 1000);
        })
    },
}

async function setupMessenger() {
    const channel = await createChannel()
    await createQueue({ exchange: "hello_event_results", queue: replyToQueue, exclusive: true });
    for (const key of Object.keys(routingMap)) {
        await createQueue({ exchange: "ex_hello", queue: eventQueue, exclusive: false, key: key });
    }
    channel.consume(replyToQueue, (msg) => {
        const payload = JSON.parse(msg.content.toString());
        // console.log({ responsePayload: payload });
        const {eventID} = payload;
        const res = responseMap[eventID]
        if (res) {
            console.log("found res obj");
            res.json({...payload, origin: replyToQueue});
        }
        channel.ack(msg);
        delete responseMap[eventID];

        console.log("After acknowledging response map size:", Object.keys(responseMap).length);
    });
    channel.consume(eventQueue, (msg) => {
        const payload = JSON.parse(msg.content.toString());
        // console.log({ payload });
        const { eventName } = payload;
        const handler = routingMap[eventName];
        if (handler) {
            try {
                handler(payload).then((response) =>{
                    const { replyToQueue } = payload;
                    // save to event results.
                    channel.sendToQueue(replyToQueue, Buffer.from(response));
                    channel.ack(msg);
                });
            } catch (err) {
                console.log(err);
                channel.nack(msg);
            }
        }
    });
}

(async function start(){
    await setupMessenger();
    const port = process.env.PORT || 7777;
    app.listen(port, '127.0.0.1', () => {
        console.log(`Started http server at :${port}`);
    });
}());
