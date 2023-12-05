import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';
import { Priority } from '../../../../util/applicable';
import * as i0 from "@angular/core";
export declare class NotFoundHandler extends HttpErrorHandler {
    responseStatus: HttpResponseStatus;
    handleError(): void;
    getPriority(): Priority;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotFoundHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotFoundHandler>;
}
