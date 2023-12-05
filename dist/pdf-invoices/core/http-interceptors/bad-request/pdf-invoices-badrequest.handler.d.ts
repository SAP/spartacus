import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ErrorModel, HttpErrorHandler, HttpResponseStatus, Priority } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class PDFInvoicesBadRequestHandler extends HttpErrorHandler {
    responseStatus: HttpResponseStatus;
    hasMatch(errorResponse: HttpErrorResponse): boolean;
    handleError(request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected handleInvoicesListError(_request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected handlePDFDownloadError(_request: HttpRequest<any>, response: HttpErrorResponse): void;
    protected isInvoicesListNotFoundError(error: ErrorModel): boolean;
    protected isDownloadInvoiceError(error: ErrorModel): boolean;
    protected getErrors(response: HttpErrorResponse): ErrorModel[];
    getPriority(): Priority;
    static ɵfac: i0.ɵɵFactoryDeclaration<PDFInvoicesBadRequestHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PDFInvoicesBadRequestHandler>;
}
