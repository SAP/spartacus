import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { isEntityValidationError} from "../../utils/utils";
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
      this.getErrors(errorResponse).some(isEntityValidationError) &&
      this.isCostCenterRequest(errorResponse)
    );
  }

  handleError(_request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.getErrors(response)
      .filter((e) => isEntityValidationError(e))
      .forEach(() => {
        this.globalMessageService.add(
          { key: 'httpHandlers.invalidCostCenter' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors || []).filter(
      (error: any) => error.type !== 'JaloObjectNoLongerValidError'
    );
  }

  private isCostCenterRequest(errorResponse: HttpErrorResponse): boolean {
    const url = new URL(errorResponse.url);
    return url.pathname.endsWith('costcenter') && new URLSearchParams(url.search).has('costCenterId');
  }
}
