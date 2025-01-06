import { beginLogging } from '@sndwrks/lumberjack';
import osc from 'osc';

const logger = beginLogging({ name: 'oscTestClient.js' });

let oscClient;

// initializeClient({ remoteAddress, port })
export async function initializeClient ({ remoteAddress, remotePort }) {
  oscClient = new osc.UDPPort({
    localAddress: '0.0.0.0',
    localPort: 52020,
    remoteAddress,
    remotePort,
  });

  return new Promise((resolve, reject) => {
    logger.info('Attempting OSC Client initialization.');
    oscClient.on('ready', () => {
      logger.info('Client opened successfully.');
      resolve();
    });
    oscClient.on('error', reject);

    oscClient.open();
  });
}

// sendMessages({ total, ratePerSecond, customMessage })
export function sendMessages ({
  total, batchNumber = 0, ratePerSecond, customMessage = '/sndwrks/osc-load-tester/test',
}) {
  if (!oscClient) {
    throw new Error('OSC Server not initialized!');
  }

  function recursiveSendMessage (messageNumber) {
    const newMessageNumber = messageNumber + 1;

    if (!(newMessageNumber < total)) return;

    oscClient.send({ address: `${customMessage}/${messageNumber + batchNumber * total}` });

    if (ratePerSecond) {
      setTimeout(() => {
        recursiveSendMessage(newMessageNumber);
      }, 1000 / ratePerSecond);
    } else {
      recursiveSendMessage(newMessageNumber);
    }
  }

  recursiveSendMessage(0);
}
