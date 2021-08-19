import chalk from 'chalk';
import * as React from 'react';

const loggerContext = React.createContext<Logger | undefined>(undefined);

export const LoggerProvider: React.FunctionComponent = ({ children }) => {
  const logger = new ConsoleLogger(console);

  return React.createElement(
    loggerContext.Provider,
    { value: logger },
    children,
  );
};

export function useLogger(): Logger {
  const logger = React.useContext(loggerContext);

  if (!logger) {
    throw new Error('useLogger must be a child of loggerProvider');
  }

  return logger;
}

class ConsoleLogger implements Logger {
  constructor(protected readonly console: Console) {}

  debug(message: string, options?: Options) {
    this.console.debug(chalk.blue('debug ::'), message, options);
    return {};
  }

  info(message: string, options?: Options) {
    this.console.info(chalk.cyan('info ::'), message, options);
    return {};
  }

  warn(message: string, options?: Options) {
    this.console.warn(chalk.yellow('warn ::'), message, options);
    return {};
  }

  error(message: string, options?: Options) {
    this.console.error(chalk.magenta('error ::'), message, options);
    return {};
  }

  exception(error: Error, options?: Options) {
    this.console.error(chalk.redBright('Exception ::'), error, options);
    return {};
  }
}

interface Logger {
  debug(message: string, options?: Options): void;
  info(message: string, options?: Options): void;
  warn(message: string, options?: Options): void;
  error(message: string, options?: Options): void;
  exception(error: Error, options?: Options): void;
}

export interface Options {
  extra?: Record<string, string | { toString(): string } | undefined>;
}
