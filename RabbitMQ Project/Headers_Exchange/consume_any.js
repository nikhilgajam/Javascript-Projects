const amqplib = require("amqplib/callback_api");
const exchangeName = "exchangeHeaders";

amqplib.connect('amqp://localhost', (err, conn) => {
    if (err) {
        throw err;
    }

    conn.createChannel(async (err, channel) => {
        if (err) {
            throw err;
        }

        channel.assertExchange(exchangeName, 'headers', { durable: false })
        channel.assertQueue('', { exclusive: true }, (err, q) => {
            if (err) {
                throw err;
            }
            console.log('Waiting for the messages in', q.queue);
            channel.bindQueue(q.queue, exchangeName, '', {'account': 'new', 'method': 'facebook', 'x-match': 'any'}); 
            channel.consume(q.queue, (msg) => {
                console.log("Message received: ", msg.content.toString(), "Routing Key: ", msg.properties.headers);
            }, { noAck: true });
        });
    })
});
