import { HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from '../logger';
import { HttpErrorModel } from '../model/misc.model';
/**
 * Normalizes HttpErrorResponse to HttpErrorModel.
 *
 * Can be used as a safe and generic way for embodying http errors into
 * NgRx Action payload, as it will strip potentially unserializable parts from
 * it and warn in debug mode if passed error is not instance of HttpErrorModel
 * (which usually happens when logic in NgRx Effect is not sealed correctly)
 */
export declare function normalizeHttpError(error: HttpErrorResponse | HttpErrorModel | any, logger?: LoggerService): HttpErrorModel | undefined;
