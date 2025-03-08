const amqplib = require('amqplib/callback_api');
const exchangeName = "exchangeHeaders";
const args = process.argv.slice(2) || 'Hey!';
const message = args[1] || 'Hey!';

amqplib.connect('amqp://localhost', (err, conn) => {
    if(err) {
        throw err;
    }

    conn.createChannel((err, channel) => {
        if(err) {
            throw err;
        }

        channel.assertExchange(exchangeName, 'headers', { durable: false });
        channel.publish(exchangeName, '', Buffer.from(message), {headers: {account: 'new', method: 'google'}});
        console.log("Message sent: ", message);
        setTimeout(() => {
            conn.close();
        }, 500);
    });
});
