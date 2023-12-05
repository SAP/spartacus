import { Injectable } from '@angular/core';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';
import * as i0 from "@angular/core";
const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';
export class BadRequestHandler extends HttpErrorHandler {
    constructor() {
        super(...arguments);
        this.responseStatus = HttpResponseStatus.BAD_REQUEST;
    }
    handleError(request, response) {
        this.handleBadPassword(request, response);
        this.handleBadLoginResponse(request, response);
        this.handleValidationError(request, response);
        this.handleGuestDuplicateEmail(request, response);
        this.handleUnknownIdentifierError(request, response);
    }
    handleBadPassword(request, response) {
        if (response.url?.includes(OAUTH_ENDPOINT) &&
            response.error?.error === 'invalid_grant' &&
            request.body?.get('grant_type') === 'password') {
            this.globalMessageService.add({
                key: this.getErrorTranslationKey(response.error?.error_description),
                params: {
                    errorMessage: response.error.error_description || response.message || '',
                },
            }, GlobalMessageType.MSG_TYPE_ERROR);
            this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }
    }
    handleBadLoginResponse(_request, response) {
        this.getErrors(response)
            .filter((error) => error.type === 'PasswordMismatchError')
            .forEach(() => {
            // Updating email and changing password share same http error occurence.
            // Determine the context of global error message based on request url
            const url = new URL(_request.url);
            const key = url.pathname.endsWith('/password')
                ? 'httpHandlers.badRequestOldPasswordIncorrect'
                : 'httpHandlers.validationErrors.invalid.password';
            this.globalMessageService.add({ key }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    handleValidationError(_request, response) {
        this.getErrors(response)
            .filter((e) => e.type === 'ValidationError')
            .forEach((error) => {
            this.globalMessageService.add({
                key: `httpHandlers.validationErrors.${error.reason}.${error.subject}`,
            }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    handleGuestDuplicateEmail(_request, response) {
        this.getErrors(response)
            .filter((e) => e.type === 'DuplicateUidError')
            .forEach((error) => {
            this.globalMessageService.add({
                key: 'httpHandlers.badRequestGuestDuplicateEmail',
                params: {
                    errorMessage: error.message || '',
                },
            }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    handleUnknownIdentifierError(_request, response) {
        this.getErrors(response)
            .filter((e) => e.type === 'UnknownIdentifierError')
            .forEach((error) => {
            this.globalMessageService.add(error.message
                ? error.message
                : { key: 'httpHandlers.unknownIdentifier' }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    getErrors(response) {
        return (response.error?.errors || []).filter((error) => error.type !== 'JaloObjectNoLongerValidError');
    }
    getPriority() {
        return -10 /* Priority.LOW */;
    }
}
BadRequestHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadRequestHandler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
BadRequestHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadRequestHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BadRequestHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkLXJlcXVlc3QuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2dsb2JhbC1tZXNzYWdlL2h0dHAtaW50ZXJjZXB0b3JzL2hhbmRsZXJzL2JhZC1yZXF1ZXN0L2JhZC1yZXF1ZXN0LmhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFFekQsTUFBTSxjQUFjLEdBQUcsa0NBQWtDLENBQUM7QUFLMUQsTUFBTSxPQUFPLGlCQUFrQixTQUFRLGdCQUFnQjtJQUh2RDs7UUFJRSxtQkFBYyxHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztLQWtIakQ7SUFoSEMsV0FBVyxDQUFDLE9BQXlCLEVBQUUsUUFBMkI7UUFDaEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFUyxpQkFBaUIsQ0FDekIsT0FBeUIsRUFDekIsUUFBMkI7UUFFM0IsSUFDRSxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxj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Q2xELE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCLEtBQUssQ0FBQyxPQUFPO2dCQUNYLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTztnQkFDZixDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsZ0NBQWdDLEVBQUUsRUFDN0MsaUJBQWlCLENBQUMsY0FBYyxDQUNqQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVMsU0FBUyxDQUFDLFFBQTJCO1FBQzdDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQzFDLENBQUMsS0FBaUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyw4QkFBOEIsQ0FDckUsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsOEJBQW9CO0lBQ3RCLENBQUM7OzhHQWxIVSxpQkFBaUI7a0hBQWpCLGlCQUFpQixjQUZoQixNQUFNOzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFcnJvck1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vLi4vbW9kZWwvbWlzYy5tb2RlbCc7XG5pbXBvcnQgeyBQcmlvcml0eSB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWwvYXBwbGljYWJsZSc7XG5pbXBvcnQgeyBHbG9iYWxNZXNzYWdlVHlwZSB9IGZyb20gJy4uLy4uLy4uL21vZGVscy9nbG9iYWwtbWVzc2FnZS5tb2RlbCc7XG5pbXBvcnQgeyBIdHRwUmVzcG9uc2VTdGF0dXMgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvcmVzcG9uc2Utc3RhdHVzLm1vZGVsJztcbmltcG9ydCB7IEh0dHBFcnJvckhhbmRsZXIgfSBmcm9tICcuLi9odHRwLWVycm9yLmhhbmRsZXInO1xuXG5jb25zdCBPQVVUSF9FTkRQT0lOVCA9ICcvYXV0aG9yaXphdGlvbnNlcnZlci9vYXV0aC90b2tlbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBCYWRSZXF1ZXN0SGFuZGxlciBleHRlbmRzIEh0dHBFcnJvckhhbmRsZXIge1xuICByZXNwb25zZVN0YXR1cyA9IEh0dHBSZXNwb25zZVN0YXR1cy5CQURfUkVRVUVTVDtcblxuICBoYW5kbGVFcnJvcihyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCByZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZUJhZFBhc3N3b3JkKHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgICB0aGlzLmhhbmRsZUJhZExvZ2luUmVzcG9uc2UocmVxdWVzdCwgcmVzcG9uc2UpO1xuICAgIHRoaXMuaGFuZGxlVmFsaWRhdGlvbkVycm9yKHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgICB0aGlzLmhhbmRsZUd1ZXN0RHVwbGljYXRlRW1haWwocmVxdWVzdCwgcmVzcG9uc2UpO1xuICAgIHRoaXMuaGFuZGxlVW5rbm93bklkZW50aWZpZXJFcnJvcihyZXF1ZXN0LCByZXNwb25zZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlQmFkUGFzc3dvcmQoXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICByZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2VcbiAgKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgcmVzcG9uc2UudXJsPy5pbmNsdWRlcyhPQVVUSF9FTkRQT0lOVCkgJiZcbiAgICAgIHJlc3BvbnNlLmVycm9yPy5lcnJvciA9PT0gJ2ludmFsaWRfZ3JhbnQnICYmXG4gICAgICByZXF1ZXN0LmJvZHk/LmdldCgnZ3JhbnRfdHlwZScpID09PSAncGFzc3dvcmQnXG4gICAgKSB7XG4gICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAge1xuICAgICAgICAgIGtleTogdGhpcy5nZXRFcnJvclRyYW5zbGF0aW9uS2V5KHJlc3BvbnNlLmVycm9yPy5lcnJvcl9kZXNjcmlwdGlvbiksXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6XG4gICAgICAgICAgICAgIHJlc3BvbnNlLmVycm9yLmVycm9yX2Rlc2NyaXB0aW9uIHx8IHJlc3BvbnNlLm1lc3NhZ2UgfHwgJycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICk7XG4gICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLnJlbW92ZShHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9DT05GSVJNQVRJT04pO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVCYWRMb2dpblJlc3BvbnNlKFxuICAgIF9yZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZVxuICApIHtcbiAgICB0aGlzLmdldEVycm9ycyhyZXNwb25zZSlcbiAgICAgIC5maWx0ZXIoKGVycm9yKSA9PiBlcnJvci50eXBlID09PSAnUGFzc3dvcmRNaXNtYXRjaEVycm9yJylcbiAgICAgIC5mb3JFYWNoKCgpID0+IHtcbiAgICAgICAgLy8gVXBkYXRpbmcgZW1haWwgYW5kIGNoYW5naW5nIHBhc3N3b3JkIHNoYXJlIHNhbWUgaHR0cCBlcnJvciBvY2N1cmVuY2UuXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgY29udGV4dCBvZiBnbG9iYWwgZXJyb3IgbWVzc2FnZSBiYXNlZCBvbiByZXF1ZXN0IHVybFxuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKF9yZXF1ZXN0LnVybCk7XG4gICAgICAgIGNvbnN0IGtleSA9IHVybC5wYXRobmFtZS5lbmRzV2l0aCgnL3Bhc3N3b3JkJylcbiAgICAgICAgICA/ICdodHRwSGFuZGxlcnMuYmFkUmVxdWVzdE9sZFBhc3N3b3JkSW5jb3JyZWN0J1xuICAgICAgICAgIDogJ2h0dHBIYW5kbGVycy52YWxpZGF0aW9uRXJyb3JzLmludmFsaWQucGFzc3dvcmQnO1xuXG4gICAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICAgIHsga2V5IH0sXG4gICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZVZhbGlkYXRpb25FcnJvcihcbiAgICBfcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICByZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2VcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5nZXRFcnJvcnMocmVzcG9uc2UpXG4gICAgICAuZmlsdGVyKChlKSA9PiBlLnR5cGUgPT09ICdWYWxpZGF0aW9uRXJyb3InKVxuICAgICAgLmZvckVhY2goKGVycm9yKSA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGtleTogYGh0dHBIYW5kbGVycy52YWxpZGF0aW9uRXJyb3JzLiR7ZXJyb3IucmVhc29ufS4ke2Vycm9yLnN1YmplY3R9YCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0VSUk9SXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVHdWVzdER1cGxpY2F0ZUVtYWlsKFxuICAgIF9yZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZVxuICApOiB2b2lkIHtcbiAgICB0aGlzLmdldEVycm9ycyhyZXNwb25zZSlcbiAgICAgIC5maWx0ZXIoKGUpID0+IGUudHlwZSA9PT0gJ0R1cGxpY2F0ZVVpZEVycm9yJylcbiAgICAgIC5mb3JFYWNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBrZXk6ICdodHRwSGFuZGxlcnMuYmFkUmVxdWVzdEd1ZXN0RHVwbGljYXRlRW1haWwnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogZXJyb3IubWVzc2FnZSB8fCAnJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUlxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlVW5rbm93bklkZW50aWZpZXJFcnJvcihcbiAgICBfcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICByZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2VcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5nZXRFcnJvcnMocmVzcG9uc2UpXG4gICAgICAuZmlsdGVyKChlKSA9PiBlLnR5cGUgPT09ICdVbmtub3duSWRlbnRpZmllckVycm9yJylcbiAgICAgIC5mb3JFYWNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICBlcnJvci5tZXNzYWdlXG4gICAgICAgICAgICA/IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgIDogeyBrZXk6ICdodHRwSGFuZGxlcnMudW5rbm93bklkZW50aWZpZXInIH0sXG4gICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEVycm9ycyhyZXNwb25zZTogSHR0cEVycm9yUmVzcG9uc2UpOiBFcnJvck1vZGVsW10ge1xuICAgIHJldHVybiAocmVzcG9uc2UuZXJyb3I/LmVycm9ycyB8fCBbXSkuZmlsdGVyKFxuICAgICAgKGVycm9yOiBFcnJvck1vZGVsKSA9PiBlcnJvci50eXBlICE9PSAnSmFsb09iamVjdE5vTG9uZ2VyVmFsaWRFcnJvcidcbiAgICApO1xuICB9XG5cbiAgZ2V0UHJpb3JpdHkoKTogUHJpb3JpdHkge1xuICAgIHJldHVybiBQcmlvcml0eS5MT1c7XG4gIH1cbn1cbiJdfQ==