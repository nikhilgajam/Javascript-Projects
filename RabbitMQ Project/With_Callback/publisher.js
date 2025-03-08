const amqp = require('amqplib/callback_api');

amqp.connect(`amqp://localhost`, (err, conn) => {
    if (err) {
        console.error(err);
    }
    conn.createChannel((err, channel) => {
        if(err) {
            throw err;
        }

        let queueName = "queue";
        let message = "Hello World!";
        channel.assertQueue(queueName, { durable: false });
        channel.sendToQueue(queueName, Buffer.from(message));
        console.log("Message sent: ", message);
        setTimeout(() => {
            conn.close();
        }, 1000);
    })
});

// npm i amqplib
