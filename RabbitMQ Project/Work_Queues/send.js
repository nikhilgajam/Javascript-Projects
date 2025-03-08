const amqplib = require('amqplib/callback_api');
const queueName = 'persistentQueue';
const message = process.argv.slice(2).join(' ') || 'Hey!';

amqplib.connect('amqp://localhost', (err, conn) => {
    if(err) {
        throw err;
    }

    conn.createChannel((err, channel) => {
        if(err) {
            throw err;
        }

        channel.assertQueue(queueName, { durable: true });
        channel.sendToQueue(queueName, Buffer.from(message), {persistent: true});
        console.log("Message sent: ", message);
        setTimeout(() => {
            conn.close();
        }, 500);
    });
});