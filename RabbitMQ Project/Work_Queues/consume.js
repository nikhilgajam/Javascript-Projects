const amqplib = require("amqplib/callback_api");
const exchangeName = "exchange";

amqplib.connect('amqp://localhost', (err, conn) => {
    if(err) {
        throw err;
    }

    conn.createChannel((err, channel) => {
        if(err) {
            throw err;
        }
        
        channel.consume(queueName, (msg) => {
            count = msg.content.toString().split('.').length - 1;
            setTimeout(() => {
                console.log("Message received: ", msg.content.toString());
                channel.ack(msg);
            }, count * 1000);
        });
    })
});
