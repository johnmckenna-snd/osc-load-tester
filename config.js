import 'dotenv/config';
import { configureLogger } from '@sndwrks/lumberjack';

const {
  NODE_ENV,
  SERVER_PORT,
  TEST_ADDRESS,
  TEST_PORT,
  SERVICE_NAME,
  LOG_TO_FILES,
  MESSAGES_PER_RUN,
  MESSAGES_PER_SECOND,
  SECONDS_BETWEEN_RUNS,
  TOTAL_RUNS,
} = process.env;

const config = {
  global: {
    NODE_ENV: NODE_ENV || 'development',
  },
  server: {
    PORT: SERVER_PORT || 52020,
  },
  testRunner: {
    TEST_ADDRESS: TEST_ADDRESS || 'localhost', // sndwrks server default
    TEST_PORT: TEST_PORT || '52000', // sndwrks server default
    MESSAGES_PER_RUN: MESSAGES_PER_RUN || 20,
    MESSAGES_PER_SECOND: MESSAGES_PER_SECOND || 200,
    SECONDS_BETWEEN_RUNS: SECONDS_BETWEEN_RUNS || 10,
    TOTAL_RUNS: TOTAL_RUNS || 10,
  },
  logger: {
    logToConsole: {
      enabled: NODE_ENV !== 'production',
      type: 'pretty',
    },
    logToFiles: LOG_TO_FILES || false,
    // logLevel: NODE_ENV === 'production' ? 'http' : 'silly',
    logLevel: 'info',
    service: SERVICE_NAME || 'osc-load-tester',
    lokiConfig: {
      sendLogs: false,
      apiKey: '',
      host: 'https://logs-prod3.grafana.net',
      username: '',
      logCacheLimit: 10,
    },
  },
};

configureLogger(config.logger);

if (config.global.NODE_ENV !== 'production') console.info('Initial Config', config);

export default config;
