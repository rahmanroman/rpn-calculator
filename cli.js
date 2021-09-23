const readlineSync = require('readline-sync');

const {RPN} = require('./lib/rpn');
const rpn = new RPN();

process.on('SIGINT', closeGracefully);
process.on('SIGTERM', closeGracefully);
process.on('uncaughtException', closeOnError);
process.on('warning', closeOnError);

while (true) {
    const expr = String(readlineSync.prompt());

    if (expr.toLowerCase() === 'q' || expr === '') {
        break;
    }

    try {
        rpn.parse(expr);
        console.log(rpn.toString());
    } catch (e) {
        console.error(`ERROR: ${e.message}`);
        // break;
        rpn.reset();
    }
}

async function closeGracefully(signal) {
    process.exit(0);
}

async function closeOnError(err) {
    process.exit(0);
}
