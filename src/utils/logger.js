import { format } from 'date-fns';

class Logger {
  info(message, data = {}) {
    this.log('INFO', message, data);
  }

  error(message, error = {}) {
    this.log('ERROR', message, error);
  }

  warn(message, data = {}) {
    this.log('WARN', message, data);
  }

  log(level, message, data) {
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const logMessage = `[${timestamp}] ${level}: ${message}`;
    
    switch (level) {
      case 'ERROR':
        console.error(logMessage, data);
        break;
      case 'WARN':
        console.warn(logMessage, data);
        break;
      default:
        console.log(logMessage, data);
    }
  }
}

export default new Logger();