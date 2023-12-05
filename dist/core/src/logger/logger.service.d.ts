import * as i0 from "@angular/core";
/**
 * By default it delegates logged messages to the native `console` object.
 *
 * It's a good extension point for customizing the destination of logs
 * (e.g. to use a 3rd party logger library) or to enhance logs with more contextual data.
 */
export declare class LoggerService {
    log(...args: Parameters<typeof console.log>): void;
    warn(...args: Parameters<typeof console.warn>): void;
    error(...args: Parameters<typeof console.error>): void;
    info(...args: Parameters<typeof console.info>): void;
    debug(...args: Parameters<typeof console.debug>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoggerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LoggerService>;
}
