import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import {
  ErrorModel,
  GlobalMessageType,
  GlobalMessageService,
  HttpErrorHandler,
  HttpResponseStatus,
  Priority,
  TranslationService,
} from '@spartacus/core';
import { ResponseError } from './bad-cost-center-request.model';

@Injectable({
  providedIn: 'root',
})
export class BadCostCenterRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  constructor(
    protected globalMessageService: GlobalMessageService,
    protected translationService: TranslationService
  ) {
    super(globalMessageService);
  }

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
      this.translationService
        .translate('checkoutB2B.invalidCostCenter')
        .subscribe((result: string) => {
          this.globalMessageService.add(
            result,
            GlobalMessageType.MSG_TYPE_ERROR
          );
        });
    }
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors || []).filter(
      (error: any) => error.type !== ResponseError.NO_LONGER_VALID
    );
  }

  protected isCostCenterRequest(errorResponse: HttpErrorResponse): boolean {
    if (errorResponse?.url) {
      const url = new URL(errorResponse.url);
      return (
        url.pathname.endsWith('costcenter') &&
        new URLSearchParams(url.search).has('costCenterId')
      );
    }

    return false;
  }

  protected isEntityValidationError(error: ErrorModel): boolean {
    return error.type === ResponseError.INVALID_ENTITY;
  }
}
