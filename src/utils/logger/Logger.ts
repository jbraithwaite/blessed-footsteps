export interface Logger {
  debug(message: string, options?: LoggerOptions): void;
  info(message: string, options?: LoggerOptions): void;
  warn(message: string, options?: LoggerOptions): void;
  error(message: string, options?: LoggerOptions): void;
  exception(message: string, options?: LoggerOptions): void;
}

export interface LoggerOptions {
  extra: Record<string, any>;
}
