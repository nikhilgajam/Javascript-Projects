const amqp = require('amqplib/callback_api');
const { v4: uuidv4} = require('uuid');

const args = process.argv.slice(2);
const num = parseInt(args[0]);
const uuid = uuidv4();

if (args.length === 0) {
    console.log("Try to give a number as argument. Ex: node rpc_client 100");
    process.exit(1);
}

amqp.connect('amqp://localhost', (err, conn) => {
    if (err) {
        console.error(err);
    }
    conn.createChannel((err, channel) => {
        if (err) {
            throw err;
        }

        const q = channel.assertQueue('', { exclusive: true }, (err, q) => {
            if (err) {
                throw err;
            }
            console.log('Requesting fibonacci number:', num);
            channel.sendToQueue('rpc_queue', Buffer.from(num.toString()), {
                replyTo: q.queue,
                correlationId: uuid
            });

            channel.consume(q.queue, (msg) => {
                if (msg.properties.correlationId === uuid) {
                    console.log('Fibonacci number:', msg.content.toString());
                    setTimeout(() => {
                        conn.close();
                        process.exit(0);
                    }, 500);
                }
            }, { noAck: true });
        });
    })
});

// Remote Procedure Call  (npm i uuid)
