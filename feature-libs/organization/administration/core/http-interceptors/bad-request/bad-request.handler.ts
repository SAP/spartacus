import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
export class OrganizationBadRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return (
      super.hasMatch(errorResponse) && this.getErrors(errorResponse).length > 0
    );
  }

  handleError(request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.handleDuplicated(request, response);
  }

  protected handleDuplicated(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ): void {
    this.getErrors(response).forEach(({ message }: ErrorModel) => {
      this.handleCostCenterConflict(message);
      this.handleUnitConflict(message);
      this.handlePermissionConflict(message);
      this.handleUnknownConflict(message);
    });
  }

  protected handleOrganizationConflict(
    message: string,
    mask: RegExp,
    key: string
  ) {
    const result = mask.exec(message);
    const params = { code: result?.[1] };
    if (result) {
      this.globalMessageService.add(
        { key: `organization.httpHandlers.conflict.${key}`, params },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  protected handleCostCenterConflict(message: string) {
    const mask = RegExp(
      'ambiguous unique keys \\{code\\=(.*)\\} for model B2BCostCenterModel',
      'g'
    );
    this.handleOrganizationConflict(message, mask, 'costCenter');
  }

  protected handleUnitConflict(message: string) {
    const mask = RegExp(
      'ambiguous unique keys \\{uid\\=(.*)\\} for model B2BUnitModel',
      'g'
    );
    this.handleOrganizationConflict(message, mask, 'unit');
  }

  protected handlePermissionConflict(message: string) {
    const mask = RegExp(
      'Approval Permission with code\\: (.*) already exists.',
      'g'
    );
    this.handleOrganizationConflict(message, mask, 'permission');
  }

  protected handleUnknownConflict(message: string) {
    const mask = RegExp('Model saving error.', 'g');
    this.handleOrganizationConflict(message, mask, 'unknown');
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors || [])
      .filter((error) => error.type !== 'JaloObjectNoLongerValidError')
      .filter(
        (error) =>
          error.type === 'ModelSavingError' ||
          error.type === 'DuplicateUidError'
      );
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }
}
