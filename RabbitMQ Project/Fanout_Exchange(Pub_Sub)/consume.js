const amqplib = require("amqplib/callback_api");
const exchangeName = "exchange";

amqplib.connect('amqp://localhost', (err, conn) => {
    if (err) {
        throw err;
    }

    conn.createChannel(async (err, channel) => {
        if (err) {
            throw err;
        }

        channel.assertExchange(exchangeName, 'fanout', { durable: false });
        channel.prefetch(1);;
        const q = channel.assertQueue('', { exclusive: true }, (err, q) => {
            if (err) {
                throw err;
            }
            console.log('Waiting for the messages in', q.queue);
            channel.bindQueue(q.queue, exchangeName, '');
            channel.consume(q.queue, (msg) => {
                console.log("Message received: ", msg.content.toString());
            }, { noAck: true });
        });
    })
});
