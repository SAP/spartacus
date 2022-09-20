import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import {
  ErrorModel,
  GlobalMessageType,
  HttpErrorHandler,
  HttpResponseStatus,
  Priority,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class BadCostCenterRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  getPriority(): Priority {
    return Priority.NORMAL;
  }

  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return (
      super.hasMatch(errorResponse) &&
      this.getErrors(errorResponse).some(this.isEntityValidationError) &&
      this.isCostCenterRequest(errorResponse)
    );
  }

  handleError(_request: HttpRequest<any>, response: HttpErrorResponse): void {
    if (this.getErrors(response).some((e) => this.isEntityValidationError(e))) {
      this.globalMessageService.add(
        { key: 'httpHandlers.invalidCostCenter' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors || []).filter(
      (error: any) => error.type !== 'JaloObjectNoLongerValidError'
    );
  }

  private isCostCenterRequest(errorResponse: HttpErrorResponse): boolean {
    if (errorResponse?.url) {
      const url = new URL(errorResponse.url);
      return (
        url.pathname.endsWith('costcenter') &&
        new URLSearchParams(url.search).has('costCenterId')
      );
    }

    return false;
  }

  private isEntityValidationError(error: ErrorModel): boolean {
    return error.type === 'EntityValidationError';
  }
}
