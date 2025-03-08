const amqplib = require('amqplib/callback_api');
const exchangeName = "exchange";
const message = process.argv.slice(2).join(' ') || 'Hey!';

amqplib.connect('amqp://localhost', (err, conn) => {
    if(err) {
        throw err;
    }

    conn.createChannel((err, channel) => {
        if(err) {
            throw err;
        }

        channel.assertExchange(exchangeName, 'fanout', { durable: false });
        channel.publish(exchangeName, '', Buffer.from(message));
        console.log("Message sent: ", message);
        setTimeout(() => {
            conn.close();
        }, 500);
    });
});
