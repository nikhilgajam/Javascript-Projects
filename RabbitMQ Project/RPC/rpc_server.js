const amqp = require('amqplib/callback_api');

function fibonacci(num) {
    if(num == 0 | num == 1)
        return num;

    return fibonacci(num - 1) + fibonacci(num - 2);
}

amqp.connect(`amqp://localhost`, (err, conn) => {
    if (err) {
        console.error(err);
    }
    conn.createChannel((err, channel) => {
        if(err) {
            throw err;
        }

        let queueName = "rpc_queue";
        channel.assertQueue(queueName, { durable: false });
        channel.prefetch(1);
        channel.consume(queueName, (msg) => {
            console.log("Message received: ", msg.content.toString());
            const n = parseInt(msg.content.toString());
            const fibNum = fibonacci(n);

            console.log("Sending the fibonacci answer to the client")
            channel.sendToQueue(msg.properties.replyTo, Buffer.from(fibNum.toString()), {
                correlationId: msg.properties.correlationId
            });

            channel.ack(msg);
        });

    })
});

// Remote Procedure Call  (npm i uuid)
