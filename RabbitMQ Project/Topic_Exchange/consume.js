const amqplib = require("amqplib/callback_api");
const exchangeName = "exchangeTopic";

if(process.argv.length < 3) {
    console.log("Usage: node consume.js RoutingKey message");
    process.exit(1);
}

amqplib.connect('amqp://localhost', (err, conn) => {
    if (err) {
        throw err;
    }

    conn.createChannel(async (err, channel) => {
        if (err) {
            throw err;
        }

        channel.assertExchange(exchangeName, 'topic', { durable: false })
        const q = channel.assertQueue('', { exclusive: true }, (err, q) => {
            if (err) {
                throw err;
            }
            console.log('Waiting for the messages in', q.queue);
            process.argv.slice(2).forEach((key) => { 
                channel.bindQueue(q.queue, exchangeName, key); 
            });
            channel.consume(q.queue, (msg) => {
                console.log("Message received: ", msg.content.toString(), "Routing Key: ", msg.fields.routingKey);
            }, { noAck: true });
        });
    })
});
