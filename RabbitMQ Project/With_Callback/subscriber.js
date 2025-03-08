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
        channel.assertQueue(queueName, { durable: false });
        channel.consume(queueName, (msg) => {
            console.log("Message received: ", msg.content.toString());
            channel.ack(msg);
        });

        setTimeout(() => {
            conn.close();
        }, 1000)

    })
});

// npm i amqplib
