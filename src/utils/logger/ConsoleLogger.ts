import { Logger, LoggerOptions } from './Logger';

export class ConsoleLogger implements Logger {
  constructor(protected readonly console: Console) {}

  debug(message: string, options?: LoggerOptions): void {
    this.console.debug('DEBUG :::', message, options);
  }

  info(message: string, options?: LoggerOptions): void {
    this.console.debug('INFO :::', message, options);
  }

  warn(message: string, options?: LoggerOptions): void {
    this.console.debug('WARN :::', message, options);
  }

  error(message: string, options?: LoggerOptions): void {
    this.console.debug('Error :::', message, options);
  }

  exception(message: string, options?: LoggerOptions): void {
    this.console.debug('EXCEPTION :::', message, options);
  }
}
