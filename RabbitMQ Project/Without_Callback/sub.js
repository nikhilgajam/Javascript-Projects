const amqplib = require("amqplib")

const queueName = "queue"

async function sendMessage() {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    channel.consume(queueName, (msg) => {
        console.log("Message received: ", msg.content.toString());
        channel.ack(msg);
    });
    setTimeout(() => {
        connection.close();
    }, 500);
}

sendMessage();
