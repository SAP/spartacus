import { LoggerService } from '@spartacus/core';
import * as i0 from "@angular/core";
/**
 * Custom `LoggerService` used in pre-rendering in the server environment.
 *
 * It simply forwards the arguments to the native `console` methods.
 */
export declare class PrerenderingLoggerService extends LoggerService {
    log(...args: Parameters<typeof console.log>): void;
    warn(...args: Parameters<typeof console.warn>): void;
    error(...args: Parameters<typeof console.error>): void;
    info(...args: Parameters<typeof console.info>): void;
    debug(...args: Parameters<typeof console.debug>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrerenderingLoggerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PrerenderingLoggerService>;
}
