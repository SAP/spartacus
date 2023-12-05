import { LoggerService } from '@spartacus/core';
import * as i0 from "@angular/core";
/**
 * Custom `LoggerService` used in ExpressJS.
 *
 * It converts the input arguments to a final string message similar as the native `console`
 * does (using the native function `format` from `node:util`) and passes this message
 * to a concrete server logger, used in ExpressJS.
 *
 * Besides the message, it also passes the current `request` of ExpressJS as an additional
 * context to the concrete server logger.
 */
export declare class ExpressLoggerService implements LoggerService {
    request: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    serverLogger: import("../loggers").ExpressServerLogger;
    log(...args: Parameters<typeof console.log>): void;
    warn(...args: Parameters<typeof console.warn>): void;
    error(...args: Parameters<typeof console.error>): void;
    info(...args: Parameters<typeof console.info>): void;
    debug(...args: Parameters<typeof console.debug>): void;
    protected formatLogMessage(message?: any, ...optionalParams: any[]): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpressLoggerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ExpressLoggerService>;
}
