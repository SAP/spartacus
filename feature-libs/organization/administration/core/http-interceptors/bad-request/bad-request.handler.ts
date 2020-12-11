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

  protected costCenterMask = /ambiguous unique keys \{code\\=(.*)\} for model B2BCostCenterModel/g;
  protected unitMask = /ambiguous unique keys \{uid\\=(.*)\} for model B2BUnitModel/g;
  protected permissionMask = /Approval Permission with code\: (.*) already exists\./g;
  protected unknownMask = /Model saving error\./g;

  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return super.hasMatch(errorResponse) && this.matchMask(errorResponse);
  }

  handleError(_request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.getErrors(response).forEach(({ message }: ErrorModel) => {
      this.handleCostCenterConflict(message);
      this.handleUnitConflict(message);
      this.handlePermissionConflict(message);
      this.handleUnknownConflict(message);
    });
  }

  protected matchMask(response: HttpErrorResponse): boolean {
    return this.getErrors(response).some((error) =>
      [
        this.costCenterMask,
        this.unitMask,
        this.permissionMask,
        this.unknownMask,
      ].some((mask) => mask.exec(error.message))
    );
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
    this.handleOrganizationConflict(message, this.costCenterMask, 'costCenter');
  }

  protected handleUnitConflict(message: string) {
    this.handleOrganizationConflict(message, this.unitMask, 'unit');
  }

  protected handlePermissionConflict(message: string) {
    this.handleOrganizationConflict(message, this.permissionMask, 'permission');
  }

  protected handleUnknownConflict(message: string) {
    this.handleOrganizationConflict(message, this.unknownMask, 'unknown');
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
