import { ErrorHandler } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import * as i0 from "@angular/core";
export declare class CxErrorHandler implements ErrorHandler {
    logger: LoggerService;
    handleError(error: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CxErrorHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CxErrorHandler>;
}
