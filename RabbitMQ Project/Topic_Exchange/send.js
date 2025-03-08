const amqplib = require('amqplib/callback_api');
const exchangeName = "exchangeTopic";
const args = process.argv.slice(2) || 'Hey!';
const message = args[1] || 'Hey!';
const routingKey = args[0] || 'info';

amqplib.connect('amqp://localhost', (err, conn) => {
    if(err) {
        throw err;
    }

    conn.createChannel((err, channel) => {
        if(err) {
            throw err;
        }

        channel.assertExchange(exchangeName, 'topic', { durable: false });
        channel.publish(exchangeName, routingKey, Buffer.from(message));
        console.log("Message sent: ", message);

        setTimeout(() => {
            conn.close();
        }, 500);
        
    });
});
