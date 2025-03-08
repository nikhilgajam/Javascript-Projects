const amqplib = require("amqplib")

const queueName = "queue"
const message = process.argv.slice(2).join(' ') || 'Hey there!'

async function sendMessage() {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log("Sent: ", message);
    setTimeout(() => {
        connection.close();
    }, 500);
}

sendMessage();
// https://www.youtube.com/watch?v=AMC2p0h0LJE&list=PLrwNNiB6YOA3Z3JfOUMKE6PmnpmVAJgTK&index=1