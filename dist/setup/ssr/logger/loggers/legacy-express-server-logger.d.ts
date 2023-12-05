import { ExpressServerLogger, ExpressServerLoggerContext } from './express-server-logger';
/**
 * @deprecated since 6.2, will be removed in a new major version, as contextual logging will be enabled by default.
 * Default implementation of `ExpressServerLogger` that just delegates log messages to the native `console` object without providing any context.
 * It's used when contextual logging is disabled.
 *
 *
 */
export declare class LegacyExpressServerLogger implements ExpressServerLogger {
    log(message: string, _context?: ExpressServerLoggerContext): void;
    warn(message: string, _context?: ExpressServerLoggerContext): void;
    error(message: string, _context?: ExpressServerLoggerContext): void;
    info(message: string, _context?: ExpressServerLoggerContext): void;
    debug(message: string, _context?: ExpressServerLoggerContext): void;
}
