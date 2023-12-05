import { Injectable } from '@angular/core';
import { GlobalMessageType, HttpErrorHandler, HttpResponseStatus, } from '@spartacus/core';
import * as i0 from "@angular/core";
export class PDFInvoicesBadRequestHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.BAD_REQUEST;
    }
    hasMatch(errorResponse) {
        return (super.hasMatch(errorResponse) && this.getErrors(errorResponse)?.length > 0);
    }
    handleError(request, response) {
        this.handleInvoicesListError(request, response);
        this.handlePDFDownloadError(request, response);
    }
    handleInvoicesListError(_request, response) {
        this.getErrors(response)
            .filter((e) => this.isInvoicesListNotFoundError(e))
            .forEach(() => {
            this.globalMessageService.add({ key: 'pdfInvoices.invoicesLoadingError' }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    handlePDFDownloadError(_request, response) {
        this.getErrors(response)
            .filter((e) => this.isDownloadInvoiceError(e))
            .forEach(() => {
            this.globalMessageService.add({
                key: 'pdfInvoices.downloadPDFError',
            }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    isInvoicesListNotFoundError(error) {
        return (error?.type === 'UnknownIdentifierError' &&
            error?.message != null &&
            error?.message.includes('Order'));
    }
    isDownloadInvoiceError(error) {
        return (error?.type === 'UnknownIdentifierError' &&
            error?.message != null &&
            error?.message.includes('Invoice'));
    }
    getErrors(response) {
        return (response.error?.errors).filter((error) => this.isInvoicesListNotFoundError(error) ||
            this.isDownloadInvoiceError(error));
    }
    getPriority() {
        return 0 /* Priority.NORMAL */;
    }
}
PDFInvoicesBadRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesBadRequestHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
PDFInvoicesBadRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesBadRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesBadRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLWludm9pY2VzLWJhZHJlcXVlc3QuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wZGYtaW52b2ljZXMvY29yZS9odHRwLWludGVyY2VwdG9ycy9iYWQtcmVxdWVzdC9wZGYtaW52b2ljZXMtYmFkcmVxdWVzdC5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsa0JBQWtCLEdBRW5CLE1BQU0saUJBQWlCLENBQUM7O0FBS3pCLE1BQU0sT0FBTyw0QkFBNkIsU0FBUSxnQkFBZ0I7SUFIbEU7O1FBSUUsbUJBQWMsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7S0FzRWpEO0lBcEVDLFFBQVEsQ0FBQyxhQUFnQztRQUN2QyxPQUFPLENBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQzNFLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXlCLEVBQUUsUUFBMkI7UUFDaEUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFUyx1QkFBdUIsQ0FDL0IsUUFBMEIsRUFDMUIsUUFBMkI7UUFFM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7YUFDckIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEQsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCLEVBQUUsR0FBRyxFQUFFLGtDQUFrQyxFQUFFLEVBQzNDLGlCQUFpQixDQUFDLGNBQWMsQ0FDakMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVTLHNCQUFzQixDQUM5QixRQUEwQixFQUMxQixRQUEyQjtRQUUzQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzthQUNyQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0I7Z0JBQ0UsR0FBRyxFQUFFLDhCQUE4QjthQUNwQyxFQUNELGlCQUFpQixDQUFDLGNBQWMsQ0FDakMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVTLDJCQUEyQixDQUFDLEtBQWlCO1FBQ3JELE9BQU8sQ0FDTCxLQUFLLEVBQUUsSUFBSSxLQUFLLHdCQUF3QjtZQUN4QyxLQUFLLEVBQUUsT0FBTyxJQUFJLElBQUk7WUFDdEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQ2pDLENBQUM7SUFDSixDQUFDO0lBRVMsc0JBQXNCLENBQUMsS0FBaUI7UUFDaEQsT0FBTyxDQUNMLEtBQUssRUFBRSxJQUFJLEtBQUssd0JBQXdCO1lBQ3hDLEtBQUssRUFBRSxPQUFPLElBQUksSUFBSTtZQUN0QixLQUFLLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FDbkMsQ0FBQztJQUNKLENBQUM7SUFFUyxTQUFTLENBQUMsUUFBMkI7UUFDN0MsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUNwQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQ2IsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUssQ0FBQztZQUN2QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQ3JDLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULCtCQUF1QjtJQUN6QixDQUFDOzt5SEF0RVUsNEJBQTRCOzZIQUE1Qiw0QkFBNEIsY0FGM0IsTUFBTTsyRkFFUCw0QkFBNEI7a0JBSHhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRXJyb3JNb2RlbCxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIEh0dHBFcnJvckhhbmRsZXIsXG4gIEh0dHBSZXNwb25zZVN0YXR1cyxcbiAgUHJpb3JpdHksXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQREZJbnZvaWNlc0JhZFJlcXVlc3RIYW5kbGVyIGV4dGVuZHMgSHR0cEVycm9ySGFuZGxlciB7XG4gIHJlc3BvbnNlU3RhdHVzID0gSHR0cFJlc3BvbnNlU3RhdHVzLkJBRF9SRVFVRVNUO1xuXG4gIGhhc01hdGNoKGVycm9yUmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHN1cGVyLmhhc01hdGNoKGVycm9yUmVzcG9uc2UpICYmIHRoaXMuZ2V0RXJyb3JzKGVycm9yUmVzcG9uc2UpPy5sZW5ndGggPiAwXG4gICAgKTtcbiAgfVxuXG4gIGhhbmRsZUVycm9yKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sIHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlSW52b2ljZXNMaXN0RXJyb3IocmVxdWVzdCwgcmVzcG9uc2UpO1xuICAgIHRoaXMuaGFuZGxlUERGRG93bmxvYWRFcnJvcihyZXF1ZXN0LCByZXNwb25zZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlSW52b2ljZXNMaXN0RXJyb3IoXG4gICAgX3JlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgcmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlXG4gICkge1xuICAgIHRoaXMuZ2V0RXJyb3JzKHJlc3BvbnNlKVxuICAgICAgLmZpbHRlcigoZSkgPT4gdGhpcy5pc0ludm9pY2VzTGlzdE5vdEZvdW5kRXJyb3IoZSkpXG4gICAgICAuZm9yRWFjaCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICAgIHsga2V5OiAncGRmSW52b2ljZXMuaW52b2ljZXNMb2FkaW5nRXJyb3InIH0sXG4gICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZVBERkRvd25sb2FkRXJyb3IoXG4gICAgX3JlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgcmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlXG4gICkge1xuICAgIHRoaXMuZ2V0RXJyb3JzKHJlc3BvbnNlKVxuICAgICAgLmZpbHRlcigoZSkgPT4gdGhpcy5pc0Rvd25sb2FkSW52b2ljZUVycm9yKGUpKVxuICAgICAgLmZvckVhY2goKCkgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBrZXk6ICdwZGZJbnZvaWNlcy5kb3dubG9hZFBERkVycm9yJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0ludm9pY2VzTGlzdE5vdEZvdW5kRXJyb3IoZXJyb3I6IEVycm9yTW9kZWwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgZXJyb3I/LnR5cGUgPT09ICdVbmtub3duSWRlbnRpZmllckVycm9yJyAmJlxuICAgICAgZXJyb3I/Lm1lc3NhZ2UgIT0gbnVsbCAmJlxuICAgICAgZXJyb3I/Lm1lc3NhZ2UuaW5jbHVkZXMoJ09yZGVyJylcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzRG93bmxvYWRJbnZvaWNlRXJyb3IoZXJyb3I6IEVycm9yTW9kZWwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgZXJyb3I/LnR5cGUgPT09ICdVbmtub3duSWRlbnRpZmllckVycm9yJyAmJlxuICAgICAgZXJyb3I/Lm1lc3NhZ2UgIT0gbnVsbCAmJlxuICAgICAgZXJyb3I/Lm1lc3NhZ2UuaW5jbHVkZXMoJ0ludm9pY2UnKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RXJyb3JzKHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IEVycm9yTW9kZWxbXSB7XG4gICAgcmV0dXJuIChyZXNwb25zZS5lcnJvcj8uZXJyb3JzKS5maWx0ZXIoXG4gICAgICAoZXJyb3I6IGFueSkgPT5cbiAgICAgICAgdGhpcy5pc0ludm9pY2VzTGlzdE5vdEZvdW5kRXJyb3IoZXJyb3IpIHx8XG4gICAgICAgIHRoaXMuaXNEb3dubG9hZEludm9pY2VFcnJvcihlcnJvcilcbiAgICApO1xuICB9XG5cbiAgZ2V0UHJpb3JpdHkoKTogUHJpb3JpdHkge1xuICAgIHJldHVybiBQcmlvcml0eS5OT1JNQUw7XG4gIH1cbn1cbiJdfQ==