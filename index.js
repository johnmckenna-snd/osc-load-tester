import { beginLogging } from '@sndwrks/lumberjack';

import config from './config.js';
import { initializeClient, sendMessages } from './oscTestClient.js';

const logger = beginLogging({ name: 'index.js' });

const {
  testRunner: {
    TEST_ADDRESS,
    TEST_PORT,
    MESSAGES_PER_RUN,
    MESSAGES_PER_SECOND,
    SECONDS_BETWEEN_RUNS,
    TOTAL_RUNS,
  },
} = config;

try {
  await initializeClient({
    remoteAddress: TEST_ADDRESS,
    remotePort: TEST_PORT,
  });
} catch (e) {
  logger.error(e);
}

function recursiveRun (i) {
  const newIndex = i + 1;
  logger.info(`Starting run #${newIndex}`);
  sendMessages({
    total: MESSAGES_PER_RUN, ratePerSecond: MESSAGES_PER_SECOND, batchNumber: i, ratePerSecond: MESSAGES_PER_SECOND,
  });

  if (newIndex < TOTAL_RUNS) {
    setTimeout(() => {
      recursiveRun(newIndex);
    }, 1000 * SECONDS_BETWEEN_RUNS);
  }
}

recursiveRun(0);
