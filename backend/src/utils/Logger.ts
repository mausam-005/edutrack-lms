/**
 * Logger — Centralized Logging System
 * 
 * DESIGN PATTERN: Singleton — Only one logger instance in the application.
 * SRP: This class is solely responsible for logging.
 * 
 * Supports log levels: DEBUG, INFO, WARN, ERROR
 * Format: [TIMESTAMP] [LEVEL] [CONTEXT] message
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export class Logger {
  private static instance: Logger;
  private level: LogLevel;
  private context: string;

  private constructor(context: string = 'App', level?: LogLevel) {
    this.context = context;
    this.level = level ?? (process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG);
  }

  /**
   * Singleton accessor
   */
  public static getInstance(context?: string): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(context);
    }
    return Logger.instance;
  }

  /**
   * Create a child logger with a specific context.
   * Useful for per-module logging.
   */
  public static createLogger(context: string): Logger {
    return new Logger(context, Logger.instance?.level);
  }

  private formatMessage(level: string, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level}] [${this.context}] ${message}${metaStr}`;
  }

  debug(message: string, meta?: any): void {
    if (this.level <= LogLevel.DEBUG) {
      console.debug(this.formatMessage('DEBUG', message, meta));
    }
  }

  info(message: string, meta?: any): void {
    if (this.level <= LogLevel.INFO) {
      console.info(this.formatMessage('INFO', message, meta));
    }
  }

  warn(message: string, meta?: any): void {
    if (this.level <= LogLevel.WARN) {
      console.warn(this.formatMessage('WARN', message, meta));
    }
  }

  error(message: string, error?: any): void {
    if (this.level <= LogLevel.ERROR) {
      const meta = error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error;
      console.error(this.formatMessage('ERROR', message, meta));
    }
  }
}

// Initialize singleton
export const logger = Logger.getInstance('EduTrack');
