import { ConsoleLogger } from './ConsoleLogger';
import { Logger } from './Logger';

const consoleLogger = new ConsoleLogger(console);

export const logger: Logger = {
  debug: (...args) => {
    consoleLogger.debug(...args);
  },
  info: (...args) => {
    consoleLogger.info(...args);
  },
  warn: (...args) => {
    consoleLogger.warn(...args);
  },
  error: (...args) => {
    consoleLogger.error(...args);
  },
  exception: (...args) => {
    consoleLogger.exception(...args);
  },
};
