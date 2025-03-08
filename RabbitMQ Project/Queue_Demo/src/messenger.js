const amqp = require("amqplib");
var _channel;

async function createChannel() {
    if (_channel) return _channel;
    const connection = await amqp.connect("amqp://localhost");
    _channel = await connection.createChannel();
    _channel.prefetch(1);
    return _channel;
}

async function createQueue({ queue, exchange, key, exclusive }) {
    exclusive ||= false;
    const channel = await createChannel();
    await channel.assertExchange(exchange, "topic", { durable: true });
    await channel.assertQueue(queue, { durable: true, exclusive });
    if (key)
        await channel.bindQueue(queue, exchange, key);
}

module.exports = {
    createChannel,
    createQueue,
}
